import React, { useState } from 'react';
import axios from 'axios';
import { Paper, TextInput, PasswordInput, Button, Text, Group, Progress, Box, Center } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

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

        // Check if the password meets the required strength
        if (getStrength(state.password) < 100) {
            alert('Please choose a stronger password.');
            return;
        }

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

    const requirements = [
        { re: /[0-9]/, label: 'Includes number' },
        { re: /[a-z]/, label: 'Includes lowercase letter' },
        { re: /[A-Z]/, label: 'Includes uppercase letter' },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
    ];

    const getStrength = (password) => {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    };

    const strength = getStrength(state.password);

    const checks = requirements.map((requirement, index) => (
        <Text key={index} component="div" c={requirement.re.test(state.password) ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {requirement.re.test(state.password) ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
                <Box ml={7}>{requirement.label}</Box>
            </Center>
        </Text>
    ));

    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                key={index}
                value={
                    state.password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                size={4}
            />
        ));

    return (
        <Paper padding="md" shadow="xs" style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <div style={{ maxWidth: 400, margin: 'auto' }}>
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        name="first_name"
                        value={state.first_name}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="last_name"
                        value={state.last_name}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        required
                    />
                    <Group gap={5} grow mt="xs" mb="md">
                        {bars}
                    </Group>
                    {checks}
                    <Group position="apart" style={{ paddingTop: '20px' }}>
                        <Button type="submit" disabled={strength < 100}>Register</Button>
                    </Group>
                </div>
            </form>
        </Paper>
    );
}

export default RegistrationForm;
