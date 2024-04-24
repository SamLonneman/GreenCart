import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import '../pages.css';
import {connect } from 'react-redux';
import {login} from '../../actions/auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import CSRFToken from '../../components/CSRFToken';
import Cart from '../../icons/cart.png';
import Footer from '../footer';

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
    mode: "all",
    resolver: yupResolver(LoginSchema)
  });
  
  const onSubmit = data => {
    //e.preventDefault();
    login(data['username'], data['password']);
    //console.log(data);
  };
  if (isAuthenticated) {
    return <Navigate to="/user-profile" replace = {true}/>;
  }

  return(
    <>
    <div className="signin-form">
      <div className="center">
        <div className="custom-box center border-solid">
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
      <Footer/>
    </>
  )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {login})(Login);