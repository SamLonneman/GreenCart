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
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats`, {}, config);
        const response = {
            "data": {
                "stats": {
                    "num_tasks_accepted": 5,
                    "num_tasks_completed": 5,
                    "average_turnaround_time": 2.5,
                    "num_community_oriented": 2,
                    "num_learning": 1,
                    "num_impactful": 2,
                    "num_challenging": 3
                },
            }
        };
        setStats(response.data.stats);
    };

    const getOverdueTasks = async (event) => {
        if (event)
            event.preventDefault();
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/overdue`, {}, config);
        const response = {
            "data": {
                "tasks": [
                    {
                        "id": 101,
                        "title": "Energy Monitoring",
                        "description": "Monitor your energy usage for a week to identify areas where you can reduce consumption.",
                        "expected_time_commitment": 30,
                        "is_challenging": true,
                        "is_community_oriented": false,
                        "is_impactful": true,
                        "is_learning_task": false,
                        "due_date": "2024-03-24T16:35:16.638974Z",
                        "is_accepted": true,
                        "accepted_date": "2024-04-17T16:35:23.817506Z",
                        "is_completed": false,
                        "completed_date": "2024-04-17T16:35:32.484015Z"
                    },
                    {
                        "id": 77,
                        "title": "Learn About Sustainable Textiles",
                        "description": "Research the environmental impact of different textile materials and make a list of more sustainable alternatives.",
                        "expected_time_commitment": 60,
                        "is_challenging": true,
                        "is_community_oriented": false,
                        "is_impactful": true,
                        "is_learning_task": true,
                        "due_date": "2024-03-24T12:53:01.569476Z",
                        "is_accepted": true,
                        "accepted_date": "2024-04-17T12:53:26.290488Z",
                        "is_completed": false,
                        "completed_date": "2024-04-17T16:35:02.926284Z"
                    },
                    {
                        "id": 62,
                        "title": "Grocery Sustainability Audit",
                        "description": "Review the sustainability practices of your local grocery store. Learn about their waste management, energy efficiency, and product sourcing.",
                        "expected_time_commitment": 90,
                        "is_challenging": false,
                        "is_community_oriented": false,
                        "is_impactful": true,
                        "is_learning_task": true,
                        "due_date": "2024-03-23T23:40:46.818236Z",
                        "is_accepted": true,
                        "accepted_date": "2024-04-16T23:40:59.172892Z",
                        "is_completed": false,
                        "completed_date": "2024-04-17T16:35:04.310013Z"
                    }
                ]
            }
        };
        setOverdueTasks(response.data.tasks);
    };

    // Initially load stats and overdue tasks
    useEffect(() => {
        getStats();
    }, []);
    useEffect(() => {
        getOverdueTasks();
    }, []);

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
                    <StatCard title="Average Turnaround Time" value={stats.average_turnaround_time + " days"} />
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