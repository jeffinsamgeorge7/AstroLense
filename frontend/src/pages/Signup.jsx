import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import Button from '@mui/joy/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import style from './registration.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/reg/', {
        username,
        email,
        password,
      });
      console.log(response.data);
      // alert("User registered successfully!");
      navigate('/signin')
      // Redirect or show success message
    } catch (err) {
      setError(err.response.data.message);
      alert("Registration failed: " + err.response.data.message);
    }
  };

  return (
    <>
      {/* {error && <p>{error}</p>} */}
      <form onSubmit={handleSubmit} className={style.form}>
        <TextField
          id="outlined-multiline-flexible"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ backgroundColor: 'white', width: '400px', paddingBottom: '20px' }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Email"
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: 'white', width: '400px', paddingBottom: '20px' }}
        />
        <FormControl style={{ backgroundColor: 'white', width: '400px', paddingBottom: '20px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            style={{ color: 'black' }}
          />
        </FormControl>
        <Button size="large" type="submit">
          Submit
        </Button>
      </form>
      {error &&
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
     {error}
    </Alert>}
    </>
  );
};
