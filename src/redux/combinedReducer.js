import { combineReducers } from 'redux';
import { userReducer } from './reducers/UserReducer';

const combinedReducer = combineReducers({ userReducer });

export default combinedReducer;
