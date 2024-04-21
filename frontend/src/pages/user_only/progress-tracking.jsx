import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import StatCard from '../../components/StatCard';
import TaskCard from '../../components/TaskCard';
import { Box, Button, TextField, Typography, Container, Grid, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const ProgressTracking = () => {

    const [overdueTasks, setOverdueTasks] = useState([]);
    const [stats, setStats] = useState({});

    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const getStats = async (event) => {
        if (event)
            event.preventDefault();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/progress-tracking/stats`, {}, config);
        setStats(response.data.stats);
    };

    const getOverdueTasks = async (event) => {
        if (event)
            event.preventDefault();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/overdue`, {}, config);
        setOverdueTasks(response.data.tasks);
    };

    const handleShare = async (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        await axios.post(`${process.env.REACT_APP_API_URL}/api/progress-tracking/email`, { "recipient": email }, config);
        event.target[0].value = 'Success! Share with another friend?';
    };

    const handleSendMeACopy = async (event) => {
        event.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/api/progress-tracking/email`, {}, config);
    };

    // Initially load stats and overdue tasks
    useEffect(() => {
        getStats();
    }, []);
    useEffect(() => {
        getOverdueTasks();
    }, []);

    // Format the average turnaround time
    const days = Math.floor(stats.average_turnaround_time);
    const hours = Math.round((stats.average_turnaround_time - days) * 24);
    const turnaroundTime = (days > 0 ? `${days}d ` : "") + `${hours}hr`;

    // Render the Progress Tracking page
    return (
        <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>

            {/* Page Title */}
            <Typography variant="h1" style={{ textAlign: 'center' }}>
                Progress Tracking
            </Typography>

            {/* General Performance Stats */}
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <StatCard title="Tasks Accepted" value={stats.num_tasks_accepted} />
                    <StatCard title="Tasks Completed" value={stats.num_tasks_completed} />
                    <StatCard title="Average Turnaround Time" value={turnaroundTime} />
                </Box>
            </div>

            {/* Task Tags */}
            <Typography variant="h3" style={{ marginTop: '50px' , textAlign: 'center' }}>
                Task Tags
            </Typography>
            <div style={{ maxWidth: '675px', margin: '0 auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <StatCard title="Community-Oriented Tasks" value={stats.num_community_oriented} />
                    <StatCard title="Learning Tasks" value={stats.num_learning} />
                    <StatCard title="Impactful Tasks" value={stats.num_impactful} />
                    <StatCard title="Challenging Tasks" value={stats.num_challenging} />
                </Box>
            </div>

            {/* Share with a friend */}
            <Typography variant="h3" style={{ marginTop: '50px' , textAlign: 'center' }}>
                Share with a friend!
            </Typography>
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <form onSubmit={handleShare}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs>
                            <TextField 
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <IconButton color="success" type="submit">
                                <SendIcon color="success" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
                or
            </Typography>
            <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
                <Button onClick={handleSendMeACopy} variant="contained" color="success">
                    Send me a copy
                </Button>
            </Grid>

            {/* Overdue Tasks */}
            <Typography variant="h3" style={{ marginTop: '50px' , textAlign: 'center' }}>
                Overdue Tasks
            </Typography>
            {overdueTasks.length === 0 && <Typography variant="h6" style={{ textAlign: 'center' }}>No overdue tasks. Great work!</Typography>}
            {overdueTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    showCompleteButton
                    showDeleteButton
                    getPendingTasks={getOverdueTasks}
                />
            ))}
        </div>
    );
}

export default ProgressTracking