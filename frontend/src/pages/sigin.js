import React from 'react';
import IconButton from '@mui/material/IconButton';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Fab, FormHelperText } from '@mui/material';
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
    const passRegex = new RegExp(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/);
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({userquery: "", passquery: ""});
    const [isFormInvalid, setIsFormInvalid] = React.useState(false);
    const validate = values => {
      //alert(passRegex.test(values.passquery));  
      if (passRegex.test(values.passquery)) {
        setIsFormInvalid(false);
        return true;
      } else { 
        setIsFormInvalid(true);
        return false;
      }
    };
    function handleFormChange(event) {
      let data = formData;
      data[event.target.name] = event.target.value;
      setFormData(data);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      if (validate(formData)) {
        alert("Form is valid");
        // submission logic
      } 
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    function login(formData){
      const query = formData.get('userquery');
      alert(query);
      const pass = formData.get('passquery');
      alert(pass);
    }

    return (<Box class = "center">
    <h1 class = "green ">Green<span class = "white">Cart</span> </h1>
    <h2> Please Log In</h2>
    <form onSubmit={handleSubmit}>
    <div>
         <TextField required name = "userquery" sx={{ m: 1, width: '25ch' }}  id="standard-basic" label="Username" variant="standard" margin = "dense" />
    </div>
    <div>
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" required   error = {isFormInvalid}    onChange = {handleFormChange} >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            name = "passquery"
            helperText = {isFormInvalid ? "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character" : ""}
            id="standard-adornment-password"
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
          {isFormInvalid ? <FormHelperText id="standard-weight-helper-text">Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character</FormHelperText> : ""}
        </FormControl>
    </div>
    <div>
      
    <Fab sx={{ m: 1, width: '27.5ch' }} variant="extended" color="secondary" theme = {theme}
      type = "submit">
        Sign In
    </Fab>
    </div>
    </form>

    </Box>

    );
};
