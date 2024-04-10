import Cookies from 'js-cookie';
import axios from 'axios';
import {  } from './profile';
import {
    REQUEST_AI_SUCCESS,
    REQUEST_AI_FAIL
}from './types';



export const getTasks = () => async dispatch => {
    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': 'true'
    });

    try {
        const token = Cookies.get('csrftoken');
        if (!token){
           console.error('CSRF Token not found in cookies'); 
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/AIapi/request`, body, config);        
        console.log(res.data);
        if (res.data){
            dispatch({
                type: REQUEST_AI_SUCCESS,
                payload: res.data.text
            });
            console.log("Success");
        } else {
            dispatch({
                type: REQUEST_AI_FAIL
            });
            console.log("Fail: Request failed.");
        }
        // user loading
    } catch (err) {
        dispatch({
            type: REQUEST_AI_FAIL
        });
        console.log("Fail");
    }
};