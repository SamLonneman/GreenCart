import React, { useState, useEffect } from 'react';import axios from 'axios';
import Cookies from 'js-cookie';
import './pages.css';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const TaskGenerate = async (event) => {
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/all`, body, config);
        // get whatever data you need from these guys here. this includes ID! since thats what you need to make a request to the api
        // you can also get the title, description, etc.
        setTasks(response.data.tasks);
    };
    useEffect(() => {
        TaskGenerate();
    }, []);
    return (
        // this makes a successful request !!! 
        <div>
            <h1> Task List</h1>
            <p1> Here are your tasks:</p1>
            {tasks.map((task) => (
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}
export default TaskList;