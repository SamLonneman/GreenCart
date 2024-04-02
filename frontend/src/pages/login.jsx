// import React from 'react';
// import IconButton from '@mui/material/IconButton';

// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';

// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { Box, Fab, FormHelperText } from '@mui/material';
import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import './pages.css';
import {connect } from 'react-redux';
import {login} from '../actions/auth';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { green, grey} from '@mui/material/colors';
import 'bootstrap/dist/css/bootstrap.min.css'
import CSRFToken from '../components/CSRFToken';
import Cart from '../icons/cart.png';

// const theme = createTheme({
//   palette: {
//     primary: green,
//     secondary: grey,
//   },
// });
// const customTheme = (outerTheme) =>
//   createTheme({
//     palette: {
//       mode: outerTheme.palette.mode,
//     },
//     components: {
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             '--TextField-brandBorderColor': '#E0E3E7',
//             '--TextField-brandBorderHoverColor': '#B2BAC2',
//             '--TextField-brandBorderFocusedColor': '#6F7E8C',
//             '& label.Mui-focused': {
//               color: 'var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//       MuiInput: {
//         styleOverrides: {
//           root: {
//             '&::before': {
//               borderBottom: '2px solid var(--TextField-brandBorderColor)',
//             },
//             '&:hover:not(.Mui-disabled, .Mui-error):before': {
//               borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
//             },
//             '&.Mui-focused:after': {
//               borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
//             },
//             '&MuiInputBase-root': {
//               color: 'white',
//             },
//           },
//         },
//       },
//       MuiFormControl: {
//         styleOverrides: {
//           root: {
//             '--TextField-brandBorderColor': '#E0E3E7',
//             '--TextField-brandBorderHoverColor': '#B2BAC2',
//             '--TextField-brandBorderFocusedColor': '#6F7E8C',
//             '& label.Mui-focused': {
//               color: 'var(--TextField-brandBorderFocusedColor)',
//             },
//           },
//         },
//       },
//     },
//   });

const messages = {
  missingUsername: "Please enter a username.",
  missingPassword: "Please enter a password.",
  invalidLogin: "Could not login, account does not exist or password is invalid."
};

// Yup schema for login page
const LoginSchema = Yup.object().shape({
  username: Yup
    .string()
    .required(messages.missingUsername),
  
  password: Yup
    .string()
    .required(messages.missingPassword)
})

const Login = ({login, isAuthenticated}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema)
  });

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  

  const onSubmit = e => {
    //e.preventDefault();
    login(username, password);
    console.log(e);
  };
  if (isAuthenticated) {
    return <Navigate to="/home" replace = {true}/>;
  }

  return(
    <div className="sigin-form">
      <div className="center">
        <div className="custom-box center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CSRFToken />
              <img src={Cart} alt="GreenCart"/>
              <h1 className="center-text">GreenCart</h1>
              <h2 className="sh center-text">Reimagining sustainability, 1 goal at a time.</h2>
              <div className="form-group">
                <label className="custom-text"> Username</label>
                <input 
                  name="username"
                  type="text"
                  {...register('username')}
                  className={`form-control form-item-spacing ${errors.username ? 'is-inavlid' : ''}`}
                  placeholder='greencart'
                />
                <div className="invalid-feedback">{errors.username?.message}</div>
              </div>
              <div className="form-group">
            <label className="custom-text">Password</label>
            <input
              name="password"
              type="password"
              {...register('password')}
              className={`form-control form-item-spacing ${errors.password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="custom-text btn button">Sign In</button>
          </div>
          <p className="custom-text">Don't have an account?</p>
          <div className="form-group">
            <Link to="/register"><button className="custom-text link btn btn-link">Sign Up</button></Link>
          </div>
            </form>
          </div>
        </div>
      </div>
      
    
  )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {login})(Login);
// export default function Sigin() {
   
//     const outerTheme = createTheme();
//     const passRegex = new RegExp(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/);
//     const [showPassword, setShowPassword] = React.useState(false);
//     const [formData, setFormData] = React.useState({userquery: "", passquery: ""});
//     const [isFormInvalid, setIsFormInvalid] = React.useState(false);
//     const validate = values => {
//       //alert(passRegex.test(values.passquery));  
//       if (passRegex.test(values.passquery)) {
//         setIsFormInvalid(false);
//         return true;
//       } else { 
//         setIsFormInvalid(true);
//         return false;
//       }
//     };
//     function handleFormChange(event) {
//       let data = formData;
//       data[event.target.name] = event.target.value;
//       setFormData(data);
//     }
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       if (validate(formData)) {
//         alert("Form is valid");
//         // submission logic
//       } 
//     }
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
  
//     const handleMouseDownPassword = (event) => {
//       event.preventDefault();
//     };
//     function login(formData){
//       const query = formData.get('userquery');
//       alert(query);
//       const pass = formData.get('passquery');
//       alert(pass);
//     }

//     return (<Box class = "center grey">
//     <h1 class = "green">Green<span>Cart</span> </h1>
//     <h2 class ="largetext"> Please Log In</h2>
//     <form onSubmit={handleSubmit}>
//     <ThemeProvider theme={customTheme(outerTheme)}>
//     <div>
//          <TextField required userquery InputLabelProps={{sx: {color: 'grey'},}} InputProps={{style: {color: 'grey'},}} sx={{ marginLeft: 1, width: '25ch', marginTop: 0}}  id="standard-basic" label="Username" variant="standard" margin = "dense" />
//     </div>
//     <div>
//     <FormControl sx={{ marginLeft: 1, width: '25ch'}} variant="standard" required   error = {isFormInvalid}    onChange = {handleFormChange}  >
//           <InputLabel htmlFor="standard-adornment-password" sx = {{color: 'grey'}} >Password</InputLabel >
//           <Input
//             name = "passquery"
//             helperText = {isFormInvalid ? "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character" : ""}
//             id="standard-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             sx = {{color: 'grey'}}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                   sx = {{color: 'white'}}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//           {isFormInvalid ? <FormHelperText id="standard-weight-helper-text">Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character</FormHelperText> : ""}
//         </FormControl>
//     </div>
//     </ThemeProvider>
//     <div>
//     <div>
//     <p class = "minimummargin"><a href = "/forgotpassword" class = "green">Forgot Password?</a></p>
//     </div>
      
//     <Fab sx={{ m: 1, width: '27.5ch' }} variant="extended" color="secondary" theme = {theme}
//       type = "submit">
//         Sign In
//     </Fab>
//     </div>
//     </form>
//     <div>
//     <p class = "smalltext">Don't have an account? <a href = "/register" class = "green">Sign Up</a></p>
//     </div>
//     </Box>

//     );
// };


/* <header className="signin-header">
        <Container>
          <h1 className='green'>Login</h1>
          <Form onSubmit={e => onSubmit(e)}>
            <CSRFToken />
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="formUsername">
                    <Form.Control
                      className="custom-input"
                      required type="username"
                      placeholder="Name"
                      name = 'username'
                      onChange={e => onChange(e)}
                      value = {username}
                      isInvalid={errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Form.Group controlId="formPassword">
                  <Form.Control
                    className="custom-input"
                    required type="password"
                    placeholder="Password"
                    name = 'password'
                    onChange={e => onChange(e)}
                    value = {password}
                    isInvalid={errors.password}
                  />
                </Form.Group>
              </Row>
            </Container>
            <div class="flex items-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type = 'submit'>
                  Sign Up
                </button>
              </div>
              <div>
                <p>Don't have an account? <Link to="/register"><Button variant="link">Sign Up</Button></Link></p>
              </div>
          </Form>
        </Container>
      </header> */