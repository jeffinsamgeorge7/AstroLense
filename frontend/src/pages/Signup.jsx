import React, { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import axios from 'axios';
import style from './registration.module.css';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/reg/', {
        username,
        email,
        password,
      });
      console.log(response.data);
      alert("sucessfull")
      // Redirect or show success message
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
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
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl className={style.form1}>
          <Input
            className={style.sinput}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            
          />
        </FormControl>
        <Button size="large" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
