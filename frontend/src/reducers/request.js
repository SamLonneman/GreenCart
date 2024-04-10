import {
    REQUEST_AI_SUCCESS,
    REQUEST_AI_FAIL
} from '../actions/types';

const initialState = {
    response: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case REQUEST_AI_SUCCESS:
            return {
                ...state,
                response: payload.text
            };
        case REQUEST_AI_FAIL:
        default:
            return state;
    }
};