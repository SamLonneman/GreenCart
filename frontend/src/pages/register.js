import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Register(){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
    return(
        <Box class="center"
            component = "form" 
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
        >
            <h1 class = "green "> Green<span class = "white">Cart</span> </h1>
    <h2> Register Here </h2>
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="Email"
                    variant="standard"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="Name"
                    variant="standard"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>
            <div>
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>
            <div>
                <TextField
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>

        </Box>
    )
}