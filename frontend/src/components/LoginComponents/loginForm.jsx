import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Modal } from '@mui/material';
import TypewriterDisplay from './typewriterDisplay';
import SignUpModal from './signUpModal';
import axios from 'axios';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openSignUp, setOpenSignUp] = React.useState(false);
    const handleOpen = () => setOpenSignUp(true);
    const handleClose = () => setOpenSignUp(false);
    
    
    const createUser = async (form) => {
        try {
            await axios.post(
                "http://localhost:8000/user/new-user",
                {   
                    username: form.username,
                    email: form.email,
                    name: form.name,
                    mobile: form.mobile,
                    address: form.address,
                    password: form.password,
                    employee_id: form.employee_id
                }
            );
            setOpenSignUp(false)
        } catch (err) {
        alert('Could not add User');
        } 
    };

    const texts = ['Stay Organized', 'Be Productive', 'Plan Your Tasks'];

    return (
        <Box
            sx={{
                flex: 1,
                backgroundColor: '#07b0e839',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 4,
            }}
            >
            <Box
                sx={{
                width: '100%',
                maxWidth: 400,
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                padding: 4,
                }}
            >
                <Typography
                variant="h4"
                sx={{
                    mb: 1,
                    fontWeight: 700,
                    color: '#2c2a2a',
                    fontSize: '1.5rem',
                    fontFamily: `'Alumni Sans Pinstripe', 'Segoe UI', sans-serif`,
                }}
                >
                Login to
                </Typography>

                <TypewriterDisplay text={texts}/>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                }}
                >
                <TextField
                    label="Username"
                    fullWidth
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => props.clickEnter(e, username, password)}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" onClick={() => props.clickSubmit(username, password)} fullWidth>
                    Login
                </Button>
                <Typography
                    onClick={handleOpen}  
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        color: "#0077cc",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Don't have an account? Sign up!
                </Typography>
                </form>
            </Box>
            <Modal
                open={openSignUp}
                onClose={handleClose}
                sx={{

                }}
            >
                <Box
                    sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    outline: "none",
                    }}
                >
                    <SignUpModal
                        onClose={handleClose}
                        createUser={createUser}
                    />
                </Box>
            </Modal>     
        </Box>
    )
}

export default LoginForm;