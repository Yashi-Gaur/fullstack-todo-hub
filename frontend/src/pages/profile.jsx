import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Header from '../components/header';
import Footer from '../components/footer';
import PersonIcon from '@mui/icons-material/Person';

function Profile({ token }) {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/profile', {
        headers: { Authorization: token },
      });
      setUser(res.data);
    } catch {
      alert('Failed to fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleChange = (field) => (e) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put('http://localhost:8000/api/profile', user, {
        headers: { Authorization: token },
      });
      await fetchProfile();
      setEditing(false);
    } catch {
      alert('Failed to update profile');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
      <Header isLoggedIn={true} title='Profile'/>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#07b0e839',
          px: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 420,
            p: 4,
            backgroundColor: '#ffffff',
            borderRadius: 6,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            fontFamily: `'Segoe UI', sans-serif`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: '#0c7ef0' }}>
              <PersonIcon sx={{ fontSize: 42 }} />
            </Avatar>
          </Box>

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: '#2c2a2a',
              textAlign: 'center',
              fontFamily: `'Alumni Sans Pinstripe', 'Segoe UI', sans-serif`,
            }}
          >
            Employee Profile
          </Typography>

          {editing ? (
            <>
              <TextField label="Name" fullWidth value={user.name || ''} onChange={handleChange('name')} sx={{ mb: 2 }} />
              <TextField disabled label="Username" fullWidth value={user.username || ''} onChange={handleChange('username')} sx={{ mb: 2 }} />
              <TextField label="Email" fullWidth value={user.email || ''} onChange={handleChange('email')} sx={{ mb: 2 }} />
              <TextField label="Mobile Number" fullWidth value={user.mobile || ''} onChange={handleChange('mobile')} sx={{ mb: 2 }} />
              <TextField label="Employee ID" fullWidth value={user.employee_id || ''} onChange={handleChange('employee_id')} sx={{ mb: 2 }} />
              <TextField label="Address" fullWidth value={user.address || ''} onChange={handleChange('address')} sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button variant="contained" fullWidth onClick={saveChanges} sx={{ backgroundColor: '#0c7ef0', color: 'white' }}>
                  Save
                </Button>
                <Button variant="outlined" fullWidth onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Table size="small" sx={{ mt: 1 }}>
              <TableBody>
                <TableRow><TableCell><b>Name</b></TableCell><TableCell>{user.name}</TableCell></TableRow>
                <TableRow><TableCell><b>Username</b></TableCell><TableCell>{user.username}</TableCell></TableRow>
                <TableRow><TableCell><b>Email</b></TableCell><TableCell>{user.email}</TableCell></TableRow>
                <TableRow><TableCell><b>Mobile Number</b></TableCell><TableCell>{user.mobile}</TableCell></TableRow>
                <TableRow><TableCell><b>Employee ID</b></TableCell><TableCell>{user.employee_id}</TableCell></TableRow>
                <TableRow><TableCell><b>Address</b></TableCell><TableCell>{user.address}</TableCell></TableRow>
              </TableBody>
            </Table>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {!editing && (
              <Button variant="contained" fullWidth onClick={() => setEditing(true)} sx={{ backgroundColor: '#0c7ef0', color: 'white' }}>
                Edit Profile
              </Button>
            )}
            
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default Profile;