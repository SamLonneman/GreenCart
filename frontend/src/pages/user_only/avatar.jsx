import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd'; // Correct import from Ant Design

// Function to generate random hexadecimal color
const generateRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

const RandomColorAvatar = ({ name }) => {
    const [bgColor, setBgColor] = useState('#fde3cf');
    const [textColor, setTextColor] = useState('#f56a00');

    useEffect(() => {
        setBgColor(generateRandomColor());
        setTextColor(generateRandomColor());
    }, [name]); // Regenerate colors when 'name' changes

    return (
        <Avatar
            size={64}
            shape="circle"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {name[0]}
        </Avatar>
    );
};

export default RandomColorAvatar;