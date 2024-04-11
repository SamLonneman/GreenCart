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
    const [taskID, setTaskID] = useState([]); // This is the ID of the task you want to get from the API
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/AIapi/generate-task`, body, config);
        const task1 = response.data.task1;
        const task2 = response.data.task2;
        const task3 = response.data.task3;
        console.log(task1, task2, task3)
        // get whatever data you need from these guys here. this includes ID! since thats what you need to make a request to the api
        // you can also get the title, description, etc.
        const taskList = [task1.title, task2.title, task3.title];
        const taskIDList = [task1.id, task2.id, task3.id];
        setTasks(taskList);
        setTaskID(taskIDList);
        setIsLoading(false);
    };
    // uncomment this if you want it to run on page load
    // useEffect(() => {
    //     // Dispatch the action to fetch the text when the component mounts
    //     handleRequest();
    // }, []);
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
