import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import request from './request';
export default combineReducers({
    auth,
    profile,
    request
});