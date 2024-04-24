import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TaskCard from '../../components/TaskCard';
import { Button, Box, CircularProgress, Typography } from '@mui/material';


const Tasks = () => {

    const [suggestedTasks, setSuggestedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const getSuggestedTasks = async (event) => {
        if (event)
            event.preventDefault();
        setSuggestedTasks([]);
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/AIapi/generate-task`, {}, config);
        setSuggestedTasks([response.data.task1, response.data.task2, response.data.task3]);
        setIsLoading(false);
    };

    const getPendingTasks = async (event) => {
        if (event)
            event.preventDefault();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/pending`, {}, config);
        setPendingTasks(response.data.tasks);
    };

    const getCompletedTasks = async (event) => {
        if (event)
            event.preventDefault();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/completed`, {}, config);
        setCompletedTasks(response.data.tasks);
    };

    // Initially load the pending and completed tasks lists
    useEffect(() => {
        getPendingTasks();
    }, []);
    useEffect(() => {
        getCompletedTasks();
    }, []);

    // Render the Tasks page
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Suggested Tasks */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: `60px` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <h1>Suggested Tasks</h1>
                    <div>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            {isLoading && <CircularProgress style={{ color: 'green' }}/>}
                            {isLoading && <Typography variant="h6">Generating personalized tasks...</Typography>}
                            {suggestedTasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    showAcceptButton
                                    showRejectButton
                                    getPendingTasks={getPendingTasks}
                                    setSuggestedTasks={setSuggestedTasks}
                                    suggestedTasks={suggestedTasks}
                                />
                            ))}
                        </Box>
                    </div>
                    <div>
                        <Button variant="contained" color="success" onClick={getSuggestedTasks}>
                            Suggest New Tasks
                        </Button>
                    </div>
                </Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' , gap: '150px'}}>
                {/* Active Tasks */}
                <div style={{ margin: `40px` }}>
                    <h1>Active Tasks</h1>
                    {pendingTasks.map((task) => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            showCompleteButton
                            getPendingTasks={getPendingTasks} 
                            getCompletedTasks={getCompletedTasks}
                        />
                    ))}
                </div>
                {/* Completed Tasks */}
                <div style={{ margin: `40px` }}>
                    <h1>Completed Tasks</h1>
                    {completedTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            showDeleteButton
                            getPendingTasks={getPendingTasks}
                            getCompletedTasks={getCompletedTasks}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tasks;