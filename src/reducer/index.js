import { combineReducers } from 'redux';
import computer from '../container/home/home_reducer';
import demo from '../container/demo/demo-reducer';


export default combineReducers({
    computer,
    demo,
});
