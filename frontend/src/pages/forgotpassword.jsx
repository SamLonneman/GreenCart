import * as React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import 'bootstrap/dist/css/bootstrap.min.css';

const messages = {
    missingEmail: "Please enter an email address",
    invalidEmail: "Please enter a valid email address"
}

// Yup schema for forgotpassword page.
const ForgotSchema = Yup.object().shape({
    email: Yup
        .string()
        .email(messages.invalidEmail)
        .required(messages.missingEmail)
})

export default function Forgotpassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ForgotSchema)
    });

    const onSubmit = (data) => console.log(data);

    return (
        <div className="forgot">
            <header className="forgot-header">
                <h1 className='green'>Forgot Password</h1>
                <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="formForgot">
                                    <Form.Control
                                        className="custom-input"
                                        require type="username"
                                        placeholder="email"
                                        isInvalid={errors.email}
                                        {...register('email')}
                                    />
                                </Form.Group>
                                <Form.Control.Feedback type="invalid">
                                    {errors.username?.message}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Container>
                    <div class="flex items-center">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Send Email
                        </button>
                    </div>
                </Form>
            </header>
        </div>
    )
};