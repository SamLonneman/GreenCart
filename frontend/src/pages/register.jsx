import * as React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { register }  from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import 'bootstrap/dist/css/bootstrap.min.css';


export const PASSWORD_COMPLEX_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,20}$/);

const messages = {
  missingEmail: "Please enter an email address",
  missingUsername: "Please enter a username.",
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
    .max(16, "Username is too long."),

  password: Yup
    .string()
    .required("Please enter a password.")
    .matches(PASSWORD_COMPLEX_REGEX, messages.invalidPassword)
    .min(8, "Password is too short, should be at least 8 characters."),

  re_password: Yup
    .string()
  //.oneOf([Yup.ref('password'), null], messages.noMatchPassword)
});
const Register = ({ register, isAuthenticated }) => {

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema)
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
    return <Navigate to="/login" replace = {true}/>;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace = {true}/>;
  }

  return (
    <div className="register">
      <header className="register-header">
        <Container>
          <h1 className='green'>Create Account</h1>
          <Form onSubmit={e => onSubmit(e)}>
            <CSRFToken />
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="formUsername">
                    <Form.Control
                      className="custom-input"
                      required type="username"
                      placeholder="Username"
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
                <Form.Group controlId="formEmail">
                  <Form.Control
                    className="custom-input"
                    required type="email"
                    placeholder="Email"
                    name = 'email'
                    onChange={e => onChange(e)}
                    value = {email}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
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
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Container>
            <Container>
              <Row>
                <Form.Group controlId="formConfirmPass">
                  <Form.Control
                    className="custom-input"
                    required type="password"
                    placeholder="Confirm Password"
                    name = 're_password'
                    onChange={e => onChange(e)}
                    value = {re_password}
                    isInvalid={errors.re_password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.re_password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Container>
              <div class="flex items-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type = "submit">
                  Sign Up
                </button>
              </div>
              <div>
                <p>Already have an account? <Link to="/login"><Button variant="link">Sign In</Button></Link></p>
              </div>
          </Form>
          {/* <Form>
            <Card>
                Welcome to GreenCart, please Sign Up.
            <Row>
              <Col>
                <div className="form-group">
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type="email" placeholder="gatoralbert@ufl.edu" />
                    <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Group controlId="formName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="greencart_1" />
                    <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="" />
                    <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <Form.Group controlId="re_password">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control required type="password" placeholder="" />
                    <Form.Control.Feedback type="invalid">Please re-enter your password.</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              </Row>
              </Card>
              <Row>
              <div>
                <Button type="submit">Register</Button>
              </div>
              <div>
                <p>Already have an account? <Link to="/sigin"><Button variant="link" type="submit">Sign In</Button></Link></p>
              </div>
            </Row>
          </Form> */}
        </Container>
      </header>
    </div>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);