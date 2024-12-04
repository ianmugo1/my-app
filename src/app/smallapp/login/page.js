'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Grid, Card, CardContent } from '@mui/material';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      window.location.href = '/smallapp'; // Redirect to home or another page
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              marginBottom: 3,
              color: '#d62227',
              fontWeight: 'bold',
            }}
          >
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              value={credentials.username}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={credentials.password}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              sx={{
                backgroundColor: '#d62227',
                '&:hover': { backgroundColor: '#a91a1e' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}