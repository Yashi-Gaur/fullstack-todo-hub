import React from 'react';
import logo from '../assets/yashi_logo.png';
import { Box, Typography, Fab, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Link } from 'react-router-dom';


function Header(props) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const isDashboard = props.title === 'Dashboard';
    const isProfile = props.title === 'Profile';

    return (
        <Box
            sx={{
                height: '3vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            className='header'
        >
            {/* Left: Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
            </Box>

            {/* Right: FABs */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginRight: 3.5 }}>
                {props.isLoggedIn && (
                    <>
                        {/* Dashboard Icon */}
                        {isDashboard ? (
                            <Tooltip title="Dashboard">
                                <Fab size="small" disabled className='fab' sx={{ boxShadow: 2, opacity: 0.5 }}>
                                    <DashboardCustomizeIcon color='primary' className='fab-icon' />
                                </Fab>
                            </Tooltip>
                        ) : (
                            <Link to="/dashboard">
                                <Tooltip title="Dashboard">
                                    <Fab size="small" className='fab' sx={{ boxShadow: 2 }}>
                                        <DashboardCustomizeIcon color='primary' className='fab-icon' />
                                    </Fab>
                                </Tooltip>
                            </Link>
                        )}

                        {/* Profile Icon */}
                        {isProfile ? (
                            <Tooltip title="Profile">
                                <Fab size="small" disabled className='fab' sx={{ boxShadow: 2, opacity: 0.5 }}>
                                    <AccountCircleIcon color='primary' className='fab-icon' />
                                </Fab>
                            </Tooltip>
                        ) : (
                            <Link to="/profile">
                                <Tooltip title="Profile">
                                    <Fab size="small" className='fab' sx={{ boxShadow: 2 }}>
                                        <AccountCircleIcon color='primary' className='fab-icon' />
                                    </Fab>
                                </Tooltip>
                            </Link>
                        )}

                        {/* Logout Icon */}
                        <Link to="/">
                            <Tooltip title="Logout">
                                <Fab size="small" onClick={props.logout} className='fab' sx={{ boxShadow: 2 }}>
                                    <LogoutIcon color='primary' className='fab-icon' />
                                </Fab>
                            </Tooltip>
                        </Link>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Header;