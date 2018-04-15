import React, {Component} from 'react';
import propTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import styledComponents from 'styled-components';
import TextField from 'material-ui/TextField';
import Icon from '../Icon';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    deleteIdea,
    updateIdea
} from '../../redux/actions';

import DeleteSVG from './icons/trash-icon.svg';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            editBody: false,
            editTitle: false,
            title: props.title,
            body: props.body,
            openSnackbar: false
        };
    }

    hideSnackbar = () => this.setState({openSnackbar: false});

    onEditBody = () => this.setState({editBody: true});

    onTitleEdit = () => this.setState({editTitle: true});

    onBodyBlur = () => {
        const {id} = this.props,
            {body} = this.state;

        if(body){
            this.setState({
                editBody: false,
                openSnackbar: true
            }, () => {
                axios.patch(`http://localhost:3000/ideas/${id}`, {
                    title: body.trim()
                }).then((response)=>{
                    console.info("PATCH RS", response);
                    updateIdea({
                        ...response.data,
                        field: 'body'
                    });
                }).catch((err)=>{
                   console.info("ERR", err);
                });
            });
        }
    };

    onTitleBlur = () => {
        const {id} = this.props,
            {title} = this.state;

        if(title){
            this.setState({
                editTitle: false,
                openSnackbar: true
            }, () => {
                axios.patch(`http://localhost:3000/ideas/${id}`, {
                    title: title.trim()
                }).then((response)=>{
                    console.info("PATCH RS", response);
                    updateIdea({
                        ...response.data,
                        field: 'title'
                    });
                }).catch((err)=>{
                    console.info("ERR", err);
                });
            });
        }
    };

    onDelete = () => {
        const {deleteIdea, id} = this.props;
        axios.delete(`http://localhost:3000/ideas/${id}`).then((response)=>{
            if(response.status == 200) deleteIdea(id);
        }).catch((err)=>{
            console.info("DELETE ERR", err);
        });
    };


    handleChange = (event) => {
        switch (event.target.name){
            case 'body':
                this.setState({
                    body: event.target.value
                });
                break;
            case 'title':
                this.setState({
                    title: event.target.value
                });
                break;
        }
    };


    render(){
        const {editBody, editTitle, body, title} = this.state;
        const DeleteIcon = Icon(DeleteSVG);

        return(
            <Wrapper>
                <div className="title">
                    {
                        !editTitle && <h4 onClick={this.onTitleEdit}>{title}</h4> || (
                            <TitleTextField
                                name="title"
                                value={title}
                                multiLine={true}
                                autoFocus={true}
                                fullWidth={true}
                                rowsMax={7}
                                onChange={this.handleChange}
                                onBlur={this.onTitleBlur}
                            />
                        )
                    }
                </div>
                <div className="body">
                    {
                        !editBody && <p onClick={this.onEditBody}>{body}</p> || (
                            <TextFieldStyled
                                name="body"
                                value={body}
                                multiLine={true}
                                autoFocus={true}
                                fullWidth={true}
                                rowsMax={7}
                                maxLength={140}
                                onChange={this.handleChange}
                                onBlur={this.onBodyBlur}
                            />
                        )
                    }
                    {
                        editBody && body && body.length > 125 && <Counter>{`${body.length} / 140`}</Counter>
                    }
                </div>
                <div className="bottom">
                    <DeleteIcon onClick={this.onDelete}/>
                    <span>Delete</span>
                </div>
                <Snackbar
                    open={this.state.openSnackbar}
                    message="Idea successfully updated"
                    autoHideDuration={4000}
                    onRequestClose={this.hideSnackbar}
                />
            </Wrapper>
        );
    }
};

const Counter = styledComponents.p`
    position: absolute;
    right: 5px;
    bottom: 5px;
`;

const TitleTextField = styledComponents(TextField)`
    position: relative !important;
    top: -8px !important;
    left: 0px !important;
    & textarea{
        margin-top: 0px !important;
        color: white !important;
        font-size: 20px !important;
        font-weight: 400 !important;
    }
`;

const TextFieldStyled = styledComponents(TextField)`
    position: relative !important;
    top: -6px !important;
    left: 0px !important;
    & textarea{
        margin-top: 0px !important;
        color: #747474 !important;
        font-weight: 300 !important;
        font-size: 14px !important;
        line-height: 19px !important;
    }
`;

const Wrapper = styledComponents.div`
   width: 280px;
   display: inline-block;
   border-radius: 10px;
   box-shadow: 0 0 6px 5px rgba(0,0,0,0.1);
   overflow: hidden;
   margin: 0 15px;
   margin-bottom: 50px;
   display: flex;
   flex-direction: column;
   &:hover{
        & > .bottom{
        opacity: 1;
        }
   }
   & > .title{
        background-color: #34567E;
        padding: 30px;
        & > h4{
            color: white;
            margin: 0;
            font-size: 20px;
            font-weight: 400;
        }
   }  
   & > .body{
        padding: 30px;
        min-height: 46px;
        position: relative;
        & > p, & > textarea{
            margin: 0;
            color: #747474;
            font-weight: 300;
            font-size: 14px;
        }
        & > textarea{
            resize: none;
            border: none;
            width: 100%;
            height: 100%;
            outline: none;
        }
   }
   & > .bottom{
        background-color: #F0F0F0;
        padding: 5px 15px;
        position: relative;
        display: flex;
        align-items: center;
        margin-top: auto;
        opacity: 0;
        transition: all 250ms ease;
        &:after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid white;
        }
        & > span{
            margin: 0;
            color: #D00303;
            font-weight: 500;
            cursor: default;
            font-size: 12px;
        }
   } 
`;

Card.propTypes = {
  id: propTypes.any.isRequired,
  title: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteIdea,
        updateIdea
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Card);