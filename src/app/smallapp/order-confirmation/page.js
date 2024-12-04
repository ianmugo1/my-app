'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  console.log('Order ID:', orderId); // Log orderId to debug

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      {orderId ? (
        <Typography variant="body1">Thank you! Your order ID is <strong>{orderId}</strong>.</Typography>
      ) : (
        <Typography variant="body1" color="error">
          No order ID found. Please contact support.
        </Typography>
      )}
    </Box>
  );
}