import * as React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
import '../App.css';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Footer from './footer';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import 'bootstrap/dist/css/bootstrap.min.css';


export const PASSWORD_COMPLEX_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,20}$/);

const messages = {
  missingEmail: "Email is required.",
  missingUsername: "Username is required.",
  invalidPassword: "Invalid Password",
  invalidPassword2: "Password must be between 8 and 20 characters.",
  noMatchPassword: "Passwords must match."
};

// Yup schema for register page.
const RegisterSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid Email Address.')
    .required(messages.missingEmail),

  username: Yup
    .string()
    .required(messages.missingUsername)
    .max(20, "Username must not exceed 20 characters."),

  password: Yup
    .string()
    .required("Password is required.")
    .matches(PASSWORD_COMPLEX_REGEX, messages.invalidPassword)
    .min(8, "Password is too short, should be at least 8 characters."),

  re_password: Yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref('password'), null], messages.noMatchPassword) // Compares with password to ensure those passwords match.
  // Password matching
});
const Register = ({ register, isAuthenticated }) => {

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema) // pass the rules to the useForm
  });

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: '',
    email: ''
  });
  const [accountCreated, setAccountCreated] = useState(false);
  const { username, password, re_password, email } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password === re_password) {
      register(username, password, re_password, email);
      setAccountCreated(true);
    }
  }
  if (accountCreated) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (

    <div className="register-form">
      <div className="container">


        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="green">Create Account</h1>
          <div className="form-group">
            <Icon.Person/>
            <input
              name="username"
              type="text"
              {...register('username')}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Username"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
        </form>
      </div>
    </div>
    // <section class="bg-gray-75 min-h-screen flex items-center justify-center">
    //     <header className="register-header">
    //         <Container>
    //           <h1 className>Create Account</h1>

    //           <Form noValidate onSubmit={e => onSubmit(e)}>
    //             <CSRFToken />
    //             <Container className="d-flex flex-column justify-content-center">
    //               <Row className="justify-content-center">
    //                 <Col>
    //                   <Form.Group controlId="formUsername">
    //                     <InputGroup>
    //                       <InputGroup.Text>
    //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
    //                       </InputGroup.Text>
    //                       <Form.Control
    //                         className="custom-input"
    //                         required type="username"
    //                         placeholder="Username"
    //                         name='username'
    //                         onChange={e => onChange(e)}
    //                         value={username}
    //                         isInvalid={errors.username}
    //                       />
    //                     </InputGroup>
    //                     <Form.Control.Feedback type="invalid">
    //                       {errors.username?.message}
    //                     </Form.Control.Feedback>
    //                   </Form.Group>
    //                 </Col>
    //               </Row>
    //             </Container>
    //             <Container>
    //               <Row>
    //                 <Form.Group controlId="formEmail">
    //                   <Form.Control
    //                     className="custom-input"
    //                     required type="email"
    //                     placeholder="Email"
    //                     name='email'
    //                     onChange={e => onChange(e)}
    //                     value={email}
    //                     isInvalid={errors.email}
    //                   />
    //                   <Form.Control.Feedback type="invalid">
    //                     {errors.email?.message}
    //                   </Form.Control.Feedback>
    //                 </Form.Group>
    //               </Row>
    //             </Container>
    //             <Container>
    //               <Row>
    //                 <Form.Group controlId="formPassword">
    //                   <Form.Control
    //                     className="custom-input"
    //                     required type="password"
    //                     placeholder="Password"
    //                     name='password'
    //                     onChange={e => onChange(e)}
    //                     value={password}
    //                     isInvalid={errors.password}
    //                   />
    //                   <Form.Control.Feedback type="invalid">
    //                     {errors.password?.message}
    //                   </Form.Control.Feedback>
    //                 </Form.Group>
    //               </Row>
    //             </Container>
    //             <Container>
    //               <Row>
    //                 <Form.Group controlId="formConfirmPass">
    //                   <Form.Control
    //                     className="custom-input"
    //                     required type="password"
    //                     placeholder="Confirm Password"
    //                     name='re_password'
    //                     onChange={e => onChange(e)}
    //                     value={re_password}
    //                     isInvalid={errors.re_password}
    //                   />
    //                   <Form.Control.Feedback type="invalid">
    //                     {errors.re_password?.message}
    //                   </Form.Control.Feedback>
    //                 </Form.Group>
    //               </Row>
    //             </Container>
    //             <div class="flex items-center">
    //               <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
    //                 Sign Up
    //               </button>
    //             </div>
    //             <div>
    //               <p>Already have an account? <Link to="/login"><Button variant="link">Sign In</Button></Link></p>
    //             </div>
    //           </Form>
    //         </Container>
    //     </header>
    // </section>


  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);