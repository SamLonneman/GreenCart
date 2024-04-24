import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL
} from '../actions/types';

const initialState = {
    username: '',
    name: '',
    email: ''
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: payload.username,
                name: payload.profile.name,
                email: payload.profile.email
            };
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                username: '',
                name: '',
                email: ''
            }
        default:
            return state;
    }
};