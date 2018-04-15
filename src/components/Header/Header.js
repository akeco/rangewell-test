import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styledComponents from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IdeaModal from '../IdeaModal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    addSort
} from '../../redux/actions';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            openSnackbar: false,
            value: null
        }
    }

    handleChange = (event, index, value) => {
        const {addSort} = this.props;
        this.setState({
            value
        }, ()=>{
            addSort(value);
        });
    };

    hideSnackbar = () => this.setState({openSnackbar: false});

    showSnackbar = () => this.setState({openSnackbar: true});

    onOpen = () => this.setState({open: true});

    onClose = () => this.setState({open: false});

    render(){
        const {open, value} = this.state;
        return(
            <Wrapper>
                <Snackbar
                    open={this.state.openSnackbar}
                    message="Idea successfully added"
                    autoHideDuration={4000}
                    onRequestClose={this.hideSnackbar}
                />
                <div style={{width: 200, paddingLeft: 20}}>
                    <SelectField
                        floatingLabelText="Sort By"
                        value={value}
                        onChange={this.handleChange}
                        fullWidth={true}
                        labelStyle={{color: 'white'}}
                        floatingLabelStyle={{color: 'rgba(255,255,255,0.75)'}}
                    >
                        <MenuItem value={'title'} primaryText="Title" />
                        <MenuItem value={'date'} primaryText="Date" />
                    </SelectField>
                </div>
                <div>
                    <RaisedButton
                        label="Add new idea"
                        onClick={this.onOpen}
                    />
                </div>
                <IdeaModal
                    open={open}
                    onClose={this.onClose}
                    showSnackbar={this.showSnackbar}
                />
            </Wrapper>
        )
    }
}

const Wrapper = styledComponents.div`
    height: 60px;
    background-color: #34567E;
    display: flex;
    align-items: center;
    & > div:last-child{
        margin-left: auto;
        margin-right: 20px;
    }
`;


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addSort
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(Header);