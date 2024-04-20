import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import StatCard from '../../components/StatCard';
import TaskCard from '../../components/TaskCard';
import { Box, Typography } from '@mui/material';


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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/stats`, {}, config);
        setStats(response.data.stats);
    };

    const getOverdueTasks = async (event) => {
        if (event)
            event.preventDefault();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/overdue`, {}, config);
        setOverdueTasks(response.data.tasks);
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
            <Typography variant="h1" style={{ textAlign: 'center' }}>
                Progress Tracking
            </Typography>
                    
            <Typography variant="h3" style={{ marginTop: '30px' , textAlign: 'center' }}>
                General Performance
            </Typography>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <StatCard title="Tasks Accepted" value={stats.num_tasks_accepted} />
                    <StatCard title="Tasks Completed" value={stats.num_tasks_completed} />
                    <StatCard title="Average Turnaround Time" value={turnaroundTime} />
                </Box>
            </div>

            <Typography variant="h3" style={{ marginTop: '30px' , textAlign: 'center' }}>
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

            <Typography variant="h3" style={{ marginTop: '30px' , textAlign: 'center' }}>
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