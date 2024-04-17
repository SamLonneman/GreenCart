import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const TaskCard = ({ task, showAcceptButton, showRejectButton, showCompleteButton, showDeleteButton, getPendingTasks, getCompletedTasks, setSuggestedTasks, suggestedTasks }) => {

    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const handleAccept = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/accept`, {id: task.id}, config);
        setSuggestedTasks(suggestedTasks.filter(t => t.id !== task.id));
        getPendingTasks();
    };

    const handleReject = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/reject`, {id: task.id}, config);
        setSuggestedTasks(suggestedTasks.filter(t => t.id !== task.id));
    };

    const handleComplete = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/complete`, {id: task.id}, config);
        getPendingTasks();
        getCompletedTasks();
    };

    const handleDelete = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/delete`, {id: task.id}, config);
        getPendingTasks();
        getCompletedTasks();
    };

    let dateText = null;
    if (task.is_accepted && !task.is_completed)
        dateText = `Due: ${new Date(task.due_date).toLocaleDateString()}`;
    else if (task.is_completed)
        dateText = `Completed: ${new Date(task.completed_date).toLocaleDateString()}`;

    return (
        <Card sx={{ width: '300px', borderRadius: '16px', margin: '10px auto', backgroundColor: '#f5f5f5', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {task.title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    {task.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: '10px'}}>
                    {showAcceptButton && <Button variant="contained" color="success" onClick={handleAccept}>Accept</Button>}
                    {showRejectButton && <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>}
                    {showCompleteButton && <Button variant="contained" color="success" onClick={handleComplete}>Complete</Button>}
                    {showDeleteButton && <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>}
                </Box>
                {dateText && <Typography variant="body2" color="text.secondary" align="right">
                    {dateText}
                </Typography>}
            </CardContent>
        </Card>
    );
};

export default TaskCard;