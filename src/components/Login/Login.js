import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import {Form, Button} from 'react-bootstrap';

export default function Login({handleSetLogIn}) {
    const history = useHistory();

    const initialFormData = {
        email: '',
        password: '',
    };
    
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        setFormData((prevState) => {
            return { ...prevState, 
                [event.target.id]: event.target.value };
        });
    };

    const _handleLogin = async (event) => {
		event.preventDefault();
		console.log('you submitted a form!');
		try {
			const response = await fetch('http://localhost:8000/token/login', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
				const token = await response.json();
				console.log(token);
				handleSetLogIn(token.auth_token);
				history.push('/');
			} else {
				alert('Invalid credentials.');
			}
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <div>
            <h2>Log in</h2>
            <Form onSubmit={_handleLogin}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    )
};