import {combineReducers} from 'redux';
import ideas from './ideas';
import sort from './sort';

export default combineReducers({
    ideas,
    sort
});