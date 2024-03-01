import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './pages.css';
import { OutlinedInput } from '@mui/material';

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
                    placeholder="albert@ufl.edu"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="Name"
                    variant="standard"
                    placeholder="Albert"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>
            <FormControl x={{m: 1, width: '25ch' }} variant="standard">
            <div>
                <OutlinedInput
                    id="standard-adornment-password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility />}

                            </IconButton>
                        </InputAdornment>
                    }
                    autoComplete="current-password"
                    variant="standard"
                    sx={{ m: 1, width: '25ch' }}
                />
            </div>
            </FormControl>
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