import React, {Component} from 'react';
import propTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    appendIdea
} from '../../redux/actions';

class IdeaModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }

    handleChange = (event) => {
        switch(event.target.name){
            case 'title':
                this.setState({
                    title: event.target.value
                });
                break;
            case 'body':
                this.setState({
                    body: event.target.value
                });
                break;
        }
    };

    submitIdea = () => {
        const {title, body} = this.state;
        const {appendIdea, onClose, showSnackbar} = this.props;
        if(title && body){
            axios.post("http://localhost:3000/ideas",
            {
                title,
                body,
                created: new Date().getTime()
            }).then((response)=>{
                appendIdea(response.data);
                showSnackbar();
            }).catch((err)=>{
                console.info("POST ERR", err);
            });
        }
        onClose();
    };

    render(){
        const {open, onClose} = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={onClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                onClick={this.submitIdea}
            />,
        ];

        return(
            <Dialog
                title="Inser new idea"
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={onClose}
            >
                <div>
                    <TextField
                        name="title"
                        hintText="Title"
                        floatingLabelText="Title"
                        autoFocus={true}
                        onChange={this.handleChange}
                    /><br/>
                    <TextField
                        name="body"
                        hintText="Content"
                        floatingLabelText="Content"
                        multiLine={true}
                        rowsMax={4}
                        onChange={this.handleChange}
                    /><br/>
                </div>
            </Dialog>
        )
    }
}

IdeaModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  showSnackbar: propTypes.func.isRequired,
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        appendIdea
    }, dispatch);
}


export default connect(null, matchDispatchToProps)(IdeaModal);