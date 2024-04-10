import {
    REQUEST_AI_SUCCESS,
    REQUEST_AI_FAIL
} from '../actions/types';

const initialState = {
    response: ''
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case REQUEST_AI_SUCCESS:
            console.log(payload);
            return {
                ...state,
                response: payload
            };
        case REQUEST_AI_FAIL:
        default:
            return state;
    }
};