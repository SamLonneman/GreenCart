
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { TextField } from '@mui/material';
import '../pages.css';
import Cookies from 'js-cookie';
const SetProfile = () =>
{
    // make call to backend to set profile
    // this is a simple post request to the backend
    // use data from the form to set the user profile
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);
        // update is made. return to user profile
        window.location.href = '/user-profile';

 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
        // submit done, redirect to user profile
    }   
    const handleChange = (e) => {
        if (e.target.id === 'email')
            setEmail(e.target.value);
        else if (e.target.id === 'name')
            setName(e.target.value);
    }
    return (
        <div>
            <h1 class = "center">Update Profile</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <TextField variant="standard" type="text" id="email" name="email" label="New Email" onChange={e => handleChange(e)} value = {email}></TextField>
                <TextField variant="standard" type="text" id="name" name="name" label = "New Name" onChange={e => handleChange(e)} value = {name}></TextField>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
export default SetProfile;