import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { LoadingContext } from '../context/loadingcontext.jsx';
import { motion } from 'framer-motion';

import Header from '../components/header';
import Footer from '../components/footer';
import AnimatedSection from '../components/LoginComponents/animatedSection.jsx';
import LoginForm from '../components/LoginComponents/loginForm.jsx';


function Login({onLogin}) {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // simulate page load
    return () => clearTimeout(timer);
  }, []);

  const submit = async (username, password) => {
    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const res = await axios.post('http://localhost:8000/user/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      onLogin(res.data.access_token);

      navigate('/dashboard');
    } catch (err) {
      alert('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleKeypress = (e, username, password) => {
    if (e.key === 'Enter') {
      submit(username, password);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Header isLoggedIn={false} />

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {/* Left side with 3D model */}
          {!isSmallScreen && (
            <AnimatedSection/>
          )}

          {/* Right side with login form */}
          <LoginForm clickSubmit={submit} clickEnter={handleKeypress}/>
          
        </Box>

        <Footer />
      </Box>
    </motion.div>
  );
}

export default Login;
