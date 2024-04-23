import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../pages.css';
import Button from '@mui/material/Button';
import { Row, Col, Card, Space, Divider } from 'antd';
import { EditOutlined, SettingOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { RandomColorAvatar } from './avatar';
import Input from '@mui/material/Input';
import { TextField } from '@mui/material';
// call to the backend to get the user profile
// this is a simple get request to the backend
// the backend will then return the user profile
// the user profile will be displayed on the page
const { Meta } = Card;

const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('No Name Provided');
    const [age, setAge] = useState('18');
    // const getUserProfile = async (event) => {
    //     if (event)
    //         event.preventDefault();
    //     const config = {
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json',
    //             'X-CSRFToken': Cookies.get('csrftoken')
    //         }
    //     };
    //     const body = JSON.stringify({
    //         'withCredentials': 'true'
    //     });
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, body, config);
    //     // get our user profile here
    //     //console.log(response.data.profile);
    //     console.log(response.data.username);
    //     console.log(response.data.profile.email);
    //     console.log(response.data.profile.name);
    //     console.log(response.data.profile.age);
    //     // set the user profile
    //     setUsername(response.data.username);
    //     setEmail(response.data.profile.email);
    //     setName(response.data.profile.name);
    //     setAge(response.data.profile.age);
    // }
    // useEffect(() => {
    //     getUserProfile();
    // }, []);


        useEffect(() => {
            setUsername("@greencart");
            setEmail("greencart@gmail.com");
            setName("Green Guy");
            setAge("56");
        }, []);


        return (
            <>
                <h1 className="text-center">{name}'s Profile</h1>
                <Card className="center"
                    style={{ marginTop: '10px', width: 300 }}
                    //title={username}
                    actions={[
                        <Button href="/setprofile"><EditOutlined style={{ fontSize: '30px' }} key="edit" /></Button>
                    ]}
                >
                    <Space>
                        <Meta
                            avatar={<RandomColorAvatar name={name}/>}
                            style={{ position: 'relative', left: '100px' }}
                        />
                    </Space>
                    <Divider />
                    <Row>
                        <MailOutlined style={{ fontSize: '22px' }} />
                        <Col span={12} offset={2}><h3>{email}</h3></Col>
                    </Row>
                    <Divider />
                    <Row>
                        <UserOutlined style={{ fontSize: '22px' }} />
                        <Col span={12} offset={2}><h3>{age} years</h3></Col>
                    </Row>
                </Card>
            </>
        );
    }
    export default UserProfile;