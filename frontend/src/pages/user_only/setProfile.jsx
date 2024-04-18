
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const SetProfile = () =>
{
    // make call to backend to set profile
    // this is a simple post request to the backend
    // use data from the form to set the user profile
    const updateProfile = async (event) => {
        if (event)
            event.preventDefault();
        const config = {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
        const body = JSON.stringify
        ({
            'withCredentials': 'true',
            'email': document.getElementById('email').value,
            'name': document.getElementById('name').value,
        });
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);
        // update is made. we should do nothing.
 
    }
    onSubmit = e => {
        e.preventDefault();
        updateProfile();
    }   
    return (
        <div>
            <h1>Set Profile</h1>
            <p1>Set your profile:</p1>
            <form onSubmit={e => onSubmit(e)}>
                <label>Email:</label>
                <input type="text" id="email" name="email"></input>
                <label>Name:</label>
                <input type="text" id="name" name="name"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default SetProfile;