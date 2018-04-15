import {
    ADD_SORT
} from "../actions/events";

const sort = (state = null, action) => {
    switch (action.type){
        case ADD_SORT:
            return action.payload;
        default:
            return state;
    }
};

export default sort;