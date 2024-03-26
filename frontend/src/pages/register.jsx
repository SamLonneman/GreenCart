import * as React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from '../actions/auth';
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
    return <Navigate to="/login" replace={true} />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <section class="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* <div className="flex w-full">
      
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">About</div>
      </div> */}
      <div classNem="flex w-full">
        <header className="register-header">
        <div className="grid h-100 flex-grow card bg-base-500 rounded-box place-items-center">
          <Container>
            <h1 className>Create Account</h1>
            
            <Form onSubmit={e => onSubmit(e)}>
              <CSRFToken />
              <Container className="d-flex flex-column justify-content-center">
                <Row className="justify-content-center">
                  <Col>
                    <Form.Group controlId="formUsername">
                      <Form.Control
                        className="custom-input"
                        required type="username"
                        placeholder="Username"
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
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
                      name='email'
                      onChange={e => onChange(e)}
                      value={email}
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
                      name='password'
                      onChange={e => onChange(e)}
                      value={password}
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
                      name='re_password'
                      onChange={e => onChange(e)}
                      value={re_password}
                      isInvalid={errors.re_password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.re_password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Container>
              <div class="flex items-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
                  Sign Up
                </button>
              </div>
              <div>
                <p>Already have an account? <Link to="/login"><Button variant="link">Sign In</Button></Link></p>
              </div>
            </Form>
          </Container>
        </div>
        </header>
      </div>
    </section>
    
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);