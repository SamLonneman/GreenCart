import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TaskCard from '../components/TaskCard';


const TaskList = () => {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
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
    useEffect(() => {
        getPendingTasks();
    }, []);
    useEffect(() => {
        getCompletedTasks();
    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ margin: `60px` }}>
                <h1>Pending Tasks</h1>
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
            <div style={{ margin: `60px` }}>
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
    );
}
export default TaskList;