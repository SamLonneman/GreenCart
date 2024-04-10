// Import necessary dependencies
import React, { useState, useEffect } from 'react';import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getTasks } from '../actions/request'; // Import the action creator
import './pages.css';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
const DisplayText = () => {
    //const dispatch = useDispatch();
    //const response = useSelector(state => state.response); // Assuming your reducer updates state.response with the received text
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRequest = async (event) => {
        if (event)
            event.preventDefault();
        setIsLoading(true);
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/AIapi/request`, body, config);
        console.log(response);
        const taskList = response.data.text.split('#');
        // the split can be defined as so
        // Data of Task 1 =  taskList[0]
        // Flags for Task 1 = taskList[1]
        // Data of Task 2 =  taskList[2]
        // Flags for Task 2 = taskList[3]
        // Data of Task 3 =  taskList[4]
        // Flags for Task 3 = taskList[5]

        setTasks(taskList);
        setIsLoading(false);
    };

    useEffect(() => {
        // Dispatch the action to fetch the text when the component mounts
        handleRequest();
    }, []);
    // TODO: Add a loading spinner or some other indicator to show that the API request is in progress
    // also, actually splice the response into the correct text elements. 
    return (
        <div>
            <button onClick={handleRequest}>Get Text</button>
            {/* Display the text received from the API request */}
            <h2>Text from API:</h2>
            <Box>
            {isLoading ? '' : tasks[0]}
            {isLoading ? '' : tasks[1]}
            {isLoading ? '' : tasks[2]}
            {isLoading ? '' : tasks[3]}
            {isLoading ? '' : tasks[4]}
            {isLoading ? '' : tasks[5]}
            </Box>
            {isLoading && (<CircularProgress 
            sx = {{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                
            }}
            />)}
        </div>
    );
};

export default DisplayText;
