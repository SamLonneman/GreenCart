import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const TaskCard = ({ task, showAcceptButton, showRejectButton, showCompleteButton, showDeleteButton, getPendingTasks, getCompletedTasks }) => {

    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const handleComplete = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/complete`, {id: task.id}, config);
        getPendingTasks();
        getCompletedTasks();
    };

    const handleAccept = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/accept`, {id: task.id}, config);
        getPendingTasks();
        getCompletedTasks();
    };

    const handleReject = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/reject`, {id: task.id}, config);
        getPendingTasks();
        getCompletedTasks();
    };

    const handleDelete = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/delete`, {id: task.id}, config);
        getPendingTasks();
        getCompletedTasks();
    };

    return (
        <Card sx={{ width: '300px', borderRadius: '16px', margin: '10px auto', backgroundColor: '#f5f5f5', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)' }}>
            <CardContent>
                <Typography variant="h5" component="div">{task.title}</Typography>
                <Typography variant="body2" sx={{ marginBottom: '10px' }}>{task.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {showAcceptButton && <Button variant="contained" color="success" onClick={handleAccept}>Accept</Button>}
                    {showCompleteButton && <Button variant="contained" color="success" onClick={handleComplete}>Complete</Button>}
                    {showRejectButton && <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>}
                    {showDeleteButton && <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;