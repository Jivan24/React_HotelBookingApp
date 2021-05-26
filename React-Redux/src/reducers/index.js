import { combineReducers } from 'redux';
import hotel from './hotel_reducer';

const rootReducer = combineReducers({
    hotel
});

export default rootReducer;