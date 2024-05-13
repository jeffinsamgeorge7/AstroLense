import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
 // Import useHistory hook to redirect
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
  
      {/* {error && <p>{error}</p>} */}
      <form onSubmit={handleSubmit} className={style.form}>
        <FormControl className={style.form1}>
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl className={style.form1}>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button size="large" type="submit">
          Submit
        </Button>
      </form>
      <Stack sx={{ width: '350px',paddingLeft:'70px' }} spacing={2}>
      {error &&   <Alert severity="error">{error}.</Alert>}
    </Stack>
     
    </>
  );
};
