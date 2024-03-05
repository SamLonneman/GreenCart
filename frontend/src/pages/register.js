import * as React from 'react';
import { useState } from 'react';
import '../App.css';
import { Container, Row, Button, Form, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div className="register">
      <header className="register-header">
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <div>
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
            </Row><Row>
              <Col>
                <div>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control required type="password" placeholder="" />
                    <Form.Control.Feedback type="invalid">Please re-enter your password.</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Col>
              <div>
                <Button type="submit">Register</Button>
              </div>
            </Row>
          </Form>
        </Container>
      </header>
    </div>

  )
};