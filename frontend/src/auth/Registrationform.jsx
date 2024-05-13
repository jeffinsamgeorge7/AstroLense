import React, { useState } from 'react';
import axios from 'axios';
import { Paper, TextInput, PasswordInput, Button, Text, Group } from '@mantine/core';

function RegistrationForm() {
    const [state, setState] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/reg/', state)
            .then(response => {
                console.log(response.data);
                alert('User registered successfully!');
            })
            .catch(error => {
                console.error('There was an error!', error);
                if (error.response && error.response.data && error.response.data.message) {
                    const errorMessage = Object.values(error.response.data.message).join("\n");
                    alert(errorMessage);
                } else {
                    alert('An error occurred while processing your request.');
                }
            });
    };
    
    

    return (
        <Paper padding="md" shadow="xs">
            <form onSubmit={handleSubmit}>
                <div style={{ maxWidth: 400, margin: 'auto' }}>
                    <Text align="center" size="xl" weight={700}>Register</Text>
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        name="first_name"
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="last_name"
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                    <Group position="apart">
                        <Button type="submit">Register</Button>
                    </Group>
                </div>
            </form>
        </Paper>
    );
}

export default RegistrationForm;
