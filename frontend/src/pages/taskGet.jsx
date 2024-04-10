// Import necessary dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../actions/request'; // Import the action creator

const DisplayText = () => {
    const dispatch = useDispatch();
    const response = useSelector(state => state.response); // Assuming your reducer updates state.response with the received text

    useEffect(() => {
        // Dispatch the action to fetch the text when the component mounts
        dispatch(getTasks());
        console.log(response);
    }, [dispatch]);
    // TODO: Add a loading spinner or some other indicator to show that the API request is in progress
    // also, actually splice the response into the correct text elements. 
    return (
        <div>
            {/* Display the text received from the API request */}
            <h2>Text from API:</h2>
            <div>{response}</div>
        </div>
    );
};

export default DisplayText;
