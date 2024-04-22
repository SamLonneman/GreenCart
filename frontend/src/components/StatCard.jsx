import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const StatCard = ({ title, value }) => {

    return (
        <Card sx={{
            width: '300px',
            borderRadius: '16px',
            margin: '10px auto',
            backgroundColor: '#f5f5f5',
            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)'
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatCard;