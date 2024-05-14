import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
// import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
 // Import useHistory hook to redirect
 import { Paper, TextInput, PasswordInput, Button, Text, Group } from '@mantine/core';

import style from './registration.module.css';
import { useNavigate } from 'react-router-dom';
export const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
   // Initialize useHistory hook

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });

      // Assuming the server returns a token upon successful login
      const token = response.data.token;

      // Save token to local storage for authentication
      localStorage.setItem('token', token);

      // Redirect to dashboard upon successful authentication
      // history.push();
      navigate('/dashboard')
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
    <Paper padding="md"  shadow="xs" style={{padding:'20px'}}>
            <form onSubmit={handleSubmit}>
                <div style={{ maxWidth: 400, margin: 'auto' }}>
                    {/* <Text align="center" size="xl" weight={700}>Login</Text> */}
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                  />
        
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                         onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Group position="apart" style={{paddingTop:'20px'}}>
                        <Button type="submit">Submit</Button>
                    </Group>
                    {error &&   <Alert severity="error">{error}.</Alert>}
                </div>
            </form>
            </Paper>
      
     
    </>
  );
};
