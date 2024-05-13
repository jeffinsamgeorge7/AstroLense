import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthToken = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // If no token is found, redirect to the login page
      navigate('/signin');
    }
  }, [navigate]);

  return token;
};
