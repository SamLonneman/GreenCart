import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../pages.css';
import { EditOutlined, SettingOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Footer from '../footer';

// call to the backend to get the user profile
// this is a simple get request to the backend
// the backend will then return the user profile
// the user profile will be displayed on the page

const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isVegan, setIsVegan] = useState(false);
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
        console.log(response.data.profile.age);
        // set the user profile
        setUsername(response.data.username);
        setEmail(response.data.profile.email);
        setIsVegan(response.data.profile.isVegan);
    }
    useEffect(() => {
        getUserProfile();
    }, []);

        return (
            <>
            <h1 className="text-center">{username}'s Profile</h1>
            <div class="profile-container">
                <div class="profile-box">
                    <Avatar className="profile-pic">{username[0]}</Avatar>
                    <a href="/questions" className="button"><SettingOutlined className="menu-icon"/></a>
                    <a href="/setprofile" className="button"><EditOutlined className="edit-icon"/></a>
                    <h2>{username}</h2>
                    <h3>{email}</h3>
                    {isVegan === true && (
                        <>
                        <p>Prefers to eat plant-based products.</p>
                        </>
                    )}
                    {isVegan === false && (
                        <>
                        <p>Prefers not to eat only plant-based products.</p>
                        </>
                    )}
                </div>
            </div>
            <Footer />
            </>
        );
    }
    export default UserProfile;