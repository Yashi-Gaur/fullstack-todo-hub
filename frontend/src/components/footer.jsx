import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 1,
                px: 4,
                display: 'flex',
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid #ddd',
                height: '1vh',
            }}
            className='footer'
        >
            <Typography sx={{ fontSize: '12.5px'}} variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Axtria. All rights reserved.{' '}
            </Typography>
        </Box>
    );
}

export default Footer;
