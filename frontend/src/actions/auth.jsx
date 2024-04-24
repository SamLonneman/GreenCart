import Cookies from 'js-cookie';
import axios from 'axios';
import { load_user } from './profile';
import {
    REGISTER_SUCCESS,   
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
}from './types';


export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/authenticated`, config);        
        
        if (res.data.error || res.data.isAuthenticated === 'error'){
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        } else if(res.data.isAuthenticated === 'success'){
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};


export const login = (username, password) => async dispatch => {

    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, body, config);        
        if (res.data.success){
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
        // user loading
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const register = (username, password, re_password, email) => async dispatch => {
    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
        
    };
    const body = JSON.stringify({username, password, re_password, email});
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config);
        if (res.data.error){
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS,
            });
        }
    
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }

};

export const preferences = (age, isVeg, isVegan, isGluten, isPesc, allergies, money, transport, energy, waste, house, time, enjoy, comm, impact, learn) => async dispatch => {
    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFTOken' : Cookies.get('csfrtoken')
        }
    };
    const body = JSON.stringify({age, isVeg, isVegan, isGluten, isPesc, allergies, money, transport, energy, waste, house, time, enjoy, comm, impact, learn});
}

export const logout = () => async dispatch => {
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
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout`, body, config);        
        if (res.data.success){
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
        // user loading
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};