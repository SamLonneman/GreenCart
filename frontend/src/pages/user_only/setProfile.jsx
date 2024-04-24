
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Divider } from 'antd';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../pages.css';
import Cookies from 'js-cookie';
import Footer from '../footer';

const NewSchema = Yup.object().shape({
    new_email: Yup
    .string()
    .email('Invalid Email Address.')
    .nullable(),

    new_name: Yup
    .string()
    .max(20, "New Name must not exceed 20 characters")
    .nullable()
}).test(
    'at-least-one-field',
    'You must provide at least one field.',
    value => value.new_email || value.new_name
);


const SetProfile = () => {
    // make call to backend to set profile
    // this is a simple post request to the backend
    // use data from the form to set the user profile
    const [success, setSuccess] = useState(false);
    const updateProfile = async (formData) => {

        let body;

        // User can change their email or name, or both.
        if(formData?.new_email === ''){
            console.log("Changing name!")
            body = JSON.stringify
            ({
                'withCredentials': 'true',
                'name': formData['new_name']
            });
        }
        else if(formData?.new_name === ''){
            console.log("Changing email!")
            body = JSON.stringify
            ({
                'withCredentials': 'true',
                'email': formData['new_email']
            });
        }
        else if(formData?.new_name && formData?.newName){
            console.log("Changing both!")
            body = JSON.stringify
            ({
                'withCredentials': 'true',
                'email': formData['new_email'],
                'name': formData['new_name']
            });
        }
        else{
            return;
        }

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
        
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);
            setSuccess(true);
        } catch (error){
            setSuccess(false);
        }
        
        // update is made. return to user profile
        if(success) window.location.href = '/user-profile';


    }
    const onSubmit = (e) => {
        console.log(e)
        updateProfile(e);
        // submit done, redirect to user profile
    }

    // setup react hook form
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "all",
        resolver: yupResolver(NewSchema)
    });

    return (
        <>
         <div className="center">
            <div className="questions-box">
                <h1 className="text-center">Update Profile</h1>
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="custom-text">New Email</label>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            {...register('new_email')}
                            className={`form-control form-item-spacing ${errors.new_email ? 'is-invalid' : ''}`}
                            placeholder="new@email.com"
                        />
                        <div className="invalid-feedback" style={{position: 'relative', left: '150px', bottom: '10px'}}>{errors.new_email?.message}</div>
                        <label className="custom-text">New Name</label>
                        <input 
                            name="name"
                            id="name"
                            type="text"
                            {...register('new_name')}
                            className={`form-control form-item-spacing ${errors.new_name ? 'is-invalid' : ''}`}
                            placeholder="newname"
                        />
                        <div className="invalid-feedback" style={{position: 'relative', left: '150px', bottom: '10px'}}>{errors.new_name?.message}</div>
                    <Button type="primary" htmlType="submit" className="button">Submit</Button>
                </form>
            </div>
            <Button type="primary" className="navigation-button" href="/user-profile" style={{position: 'relative', top:'25px', left: '175px'}}>Back</Button>
        </div>
        <Footer />
        </>
       

    )
}
export default SetProfile;