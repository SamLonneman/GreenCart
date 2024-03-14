import * as React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import { Card, Container, Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { object, string, ref } from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {

  // Yup schema for register page.
  const RegisterSchema = object().shape({
    email: string().label('Email Address').email('Invalid Email Address').required("Please enter an email address."),

    username: string().label('Username').required("Username is required.").max(16, "Username is too long."),

    password: string().label('Password').required("Please enter a password.").min(8, "Password is too short, should be at least 8 characters."),

    confirmPassword: string().label('Confirm Password').oneOf([ref('password'), null], "Passwords must match.")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema)
  });

  const onSubmit = (data) => console.log(data)

  return (
    <div className="register">
      <header className="register-header">
        <Container>
          <Card>
            <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Row>
              <Col>
              <Form.Group controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    required type="email" 
                    placeholder="gatoralbert@ufl.edu"
                    isInvalid={errors.email}
                    {...register('email')}
                     />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
              </Col>
            </Row>
            </Form>
          </Card>
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
                  <Form.Group controlId="confirmPassword">
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