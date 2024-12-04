'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(''); // Clear error on change
  };

  const handleRegister = async () => {
    const { username, password, confirmPassword } = formData;

    if (!username || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/smallapp/login'); // Redirect to login page
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          value={formData.username}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </Box>
    </Box>
  );
}