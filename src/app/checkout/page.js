'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Alert, Grid } from '@mui/material';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };
  const handlePlaceOrder = async () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.address) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
  
    const order = {
      customer: customerDetails,
      items: cart.map(({ pname, quantity, price }) => ({ pname, quantity, price })),
      totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push(`/smallapp/order-confirmation?orderId=${data.orderId}`);
      } else {
        setErrorMessage(data.message || 'Failed to place the order.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setErrorMessage('An error occurred while placing the order.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h5">Your cart is empty!</Typography>
        <Typography sx={{ marginTop: 2 }}>Add some items to proceed to checkout.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Checkout
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={customerDetails.name}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={customerDetails.email}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Delivery Address"
            name="address"
            fullWidth
            value={customerDetails.address}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlePlaceOrder}
        disabled={loading}
        sx={{ marginTop: 3 }}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </Button>
    </Box>
  );
}