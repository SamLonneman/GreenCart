import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../pages.css';
import Button from '@mui/material/Button';
import { Row, Col, Card, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
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
            <Row>
                <Col span={24}><h1 className="text-center">Profile</h1> </Col>
            </Row>
            <Card className="center" 
            style={{marginTop: '10px'}} 
            title={username}
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />
            ]}
            
            >
                <Space>
                <Meta 
                    avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIlWApcB9DkD174kGhYbj_hbHOH-bp-27-kgjOLZjaDDFoBZvZSb5jq7oaXiRUW6VRCs&usqp=CAU"/>}

                />
                <Row>
                    <Col span={24}><h2>{name}</h2></Col>
                </Row>
                </Space>
                
                <Row>
                    <Col span={12}><h2>Email Address:</h2> <h3>{email}</h3></Col>
                </Row>
                <Row>
                    <Col><h2>{age} years old</h2></Col>
                </Row>
                
            </Card>

        </>

    );
}
export default UserProfile;

{/* <h2>{username}</h2>
                <h2>Email: {email}</h2>
                <h2>Name: {name}</h2>
                <h2>Age: {age}</h2>
            <p1>Update your profile:</p1>
            <Button href="/setprofile">Set Profile</Button> */}