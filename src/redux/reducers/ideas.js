import {
    ADD_IDEAS,
    APPEND_IDEA,
    DELETE_IDEA,
    UPDATE_BODY
} from "../actions/events";

const ideas = (state = [], action) => {
    switch (action.type){
        case ADD_IDEAS:
            return action.payload;
        case APPEND_IDEA:
            return [...state, action.payload];
        case DELETE_IDEA:
            return state.filter((item)=> item.id != action.payload);
            break;
        case UPDATE_BODY:
            return state.map((item)=>{
                switch (action.payload.field){
                    case 'body':
                        if(item.id === action.payload.id) item.body = action.payload.body;
                        break;
                    case 'title':
                        if(item.id === action.payload.id) item.title = action.payload.title;
                        break;
                }
               return item;
            });
        default:
            return state;
    }
};

export default ideas;