'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';

export default function ConfirmationPage() {
  const router = useRouter();
  const orderId = new URLSearchParams(window.location.search).get('orderId'); // Get orderId from URL

  return (
    <Box sx={{ textAlign: 'center', marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Thank You for Your Order!
      </Typography>
      {orderId && (
        <Typography variant="body1" gutterBottom>
          Your order ID is: <strong>{orderId}</strong>
        </Typography>
      )}
      <Typography sx={{ marginBottom: 3 }}>
        We are processing your order and will update you soon.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/smallapp')}
      >
        Back to Home
      </Button>
    </Box>
  );
}