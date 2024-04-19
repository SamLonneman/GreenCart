import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TaskCard from '../../components/TaskCard';
import { Button, Box, CircularProgress, Typography } from '@mui/material';


const ProgressTracking = () => {

    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Render the Tasks page
    return (
        <h1>test</h1>
    );
}

export default ProgressTracking