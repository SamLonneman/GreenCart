import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {

                let cookie = cookies[i].trim();
                console.log('cookie:', cookie);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/csrf_cookie`);
                console.log('CSRF Token response:', response)
            } catch (err) {
                console.error('Error fetching CSRF token:', err); // Log any errors for debugging
            }
        };

        fetchData().then(() => {
            const token = getCookie('csrftoken');
            if (token){
                console.log('CSRF Token:', token); // Log the retrieved CSRF token for debugging
                setcsrftoken(token);
            } else {
                console.error('CSRF Token not found in cookies'); // Log any errors for debugging
            }       
        });
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;