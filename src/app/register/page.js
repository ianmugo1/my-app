'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer', // Default role
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'customer',
        });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Register
      </Typography>
      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="primary" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        select
        fullWidth
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Box>
  );
}
