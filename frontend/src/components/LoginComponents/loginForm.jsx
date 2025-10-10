import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import TypewriterDisplay from './typewriterDisplay';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                </form>
            </Box>
        </Box>
    )
}

export default LoginForm;