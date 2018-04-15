import React, {Component} from 'react';
import styledComponents from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sortBy} from 'lodash';
import {
    addIdeas
} from '../../redux/actions';

import Card from '../Card';

class Ideas extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {addIdeas} = this.props;
        axios.get("http://localhost:3000/ideas").then((response)=>{
            localStorage.setItem("ideas-list", JSON.stringify(response.data));
            addIdeas(response.data);
        }).catch((err)=>{
            console.info("ERROR", err);
            const ideasList = JSON.parse(localStorage.getItem("ideas-list"));
            if(ideasList) addIdeas(ideasList);
        });
    }

    renderIdeas = () => {
        const {ideas, sort} = this.props;
        if(ideas && ideas.length){
            if(sort){
                switch(sort){
                    case 'title':
                        return sortBy(ideas, [(o)=> o.title]).map((item)=>{
                            return (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    body={item.body}
                                />
                            );
                        });
                    case 'date':
                        return sortBy(ideas, [(o)=> o.created]).reverse().map((item)=>{
                            return (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    body={item.body}
                                />
                            );
                        });
                }

            }
            return ideas.map((item)=>{
                return (
                    <Card
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        body={item.body}
                    />
                );
            });
        }
        return(
            <div><p>Insert first Idea</p></div>
        );
    };

    render(){
        return(
            <Wrapper>
                {
                    this.renderIdeas()
                }
            </Wrapper>
        )
    }
}

const Wrapper = styledComponents.div`
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addIdeas
    }, dispatch);
}

function mapStateToProps(state) {
    return ({
        ideas: state.ideas,
        sort: state.sort,
    });
}


export default connect(mapStateToProps, matchDispatchToProps)(Ideas);