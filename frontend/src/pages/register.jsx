import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons';
import Cart from '../icons/cart.png';
import '../App.css';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Footer from './footer';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { register as registerAction } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import 'bootstrap/dist/css/bootstrap.min.css';


export const PASSWORD_COMPLEX_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,20}$/);
export const DOMAIN_REGEX = new RegExp(/@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|ufl\.edu|icloud\.com|aol\.com)$/);

const messages = {
  missingEmail: "Email is required.",
  invalidEmail: "Email not supported.",
  missingUsername: "Username is required.",
  invalidPassword: "Not strong enough.",
  invalidPassword2: "Password must be between 8 and 20 characters.",
  noMatchPassword: "Passwords must match."
};

// Yup schema for register page.
const RegisterSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid Email Address.')
    .required(messages.missingEmail)
    .matches(DOMAIN_REGEX, messages.invalidEmail),

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

const Register = ({ registerAction, isAuthenticated }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema) // pass the rules to the useForm
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const onSubmit = data => {
    //data.preventDefault();
    registerAction(data['username'], data['password'], data['re_password'], data['email']);
    setAccountCreated(true);
    console.log(accountCreated);
    console.log(data);
  }

  if (accountCreated) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="register-form">
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
              className={`form-control form-item-spacing ${errors.username ? 'is-invalid' : ''}`}
              placeholder="greencart"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="form-group">
            <label className="custom-text">Email</label>
            <input
              name="email"
              type="text"
              {...register('email')}
              className={`form-control form-item-spacing ${errors.email ? 'is-invalid' : ''}`}
              placeholder="xample@email.com"
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
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
            <label className="custom-text">Confirm Password</label>
            <input
              name="confirm-password"
              type="password"
              {...register('re_password')}
              className={`form-control form-item-spacing ${errors.re_password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
            />
            <div className="invalid-feedback">{errors.re_password?.message}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="custom-text btn button">Register</button>
          </div>
          <p className="custom-text">Have an account?</p>
          <div className="form-group">
            <Link to="/login"><button className="custom-text link btn btn-link">Log In</button></Link>
          </div>
        </form>
        </div>
      </div>
     
      {/* <Footer/> */}
    </div>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { registerAction })(Register);
