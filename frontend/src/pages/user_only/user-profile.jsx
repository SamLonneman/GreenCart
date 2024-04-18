import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// call to the backend to get the user profile
// this is a simple get request to the backend
// the backend will then return the user profile
// the user profile will be displayed on the page


const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('No Name Provided');
    const [age, setAge] = useState('18');
    const getUserProfile = async (event) => {
        if (event)
            event.preventDefault();
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, body, config);
        // get our user profile here
        //console.log(response.data.profile);
        console.log(response.data.username);
        console.log(response.data.profile.email);
        console.log(response.data.profile.name);
        console.log(response.data.profile.age);
        // set the user profile
        setUsername(response.data.username);
        setEmail(response.data.profile.email);
        setName(response.data.profile.name);
        setAge(response.data.profile.age);
    }
    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <h1>User Profile</h1> 
            <p1>Here is your profile:</p1>
            <div>
                <h2>Username: {username}</h2>
                <h2>Email: {email}</h2>
                <h2>Name: {name}</h2>
                <h2>Age: {age}</h2>
            </div>
            <p1>Update your profile:</p1>
            <a href="/setprofile">Set Profile</a>
        </div>
    );
}
export default UserProfile;