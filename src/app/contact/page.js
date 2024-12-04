'use client';

import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

export default function ContactPage() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        Have questions? We'd love to hear from you! Fill out the form below or reach out to us directly.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '400px',
        }}
      >
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Message" variant="outlined" multiline rows={4} fullWidth />
        <Button variant="contained" sx={{ bgcolor: '#d62d20', color: 'white' }}>
          Send Message
        </Button>
      </Box>
    </Box>
  );
}
