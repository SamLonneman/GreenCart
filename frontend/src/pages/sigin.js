import React from 'react';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Box, Fab } from '@mui/material';
import './pages.css';
import { createTheme } from '@mui/material/styles';
import { green, grey} from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: green,
    secondary: grey,
  },
});



export default function Sigin() {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (<Box class = "center">
    <h1 class = "green "> Green<span class = "white">Cart</span> </h1>
    <h2> Please Log In</h2>
    <div>
         <TextField sx={{ m: 1, width: '25ch' }}  id="outlined-basic" label="Username" variant="outlined" margin = "dense"  />
    </div>
    <div>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
    </div>
    <div>
    <Fab sx={{ m: 1, width: '25ch' }} variant="extended" color="secondary" theme = {theme}>
        Sign In
    </Fab>
    </div>
    </Box>

    );
};
