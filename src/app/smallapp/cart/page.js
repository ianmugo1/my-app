'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation'; // For navigation
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

export default function CartPage() {
  const { cart, clearCart, removeFromCart } = useCart();
  const router = useRouter(); // Initialize router for navigation

  // Handle Proceed to Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add some items to proceed!');
      return;
    }

    try {
      // Redirect to checkout page
      router.push('/smallapp/checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred while proceeding to checkout. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 5, padding: 3 }}>
        <Typography variant="h5">Your cart is empty!</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Add some delicious donuts to your cart to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cart.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.pname}
              />
              <CardContent>
                <Typography variant="h6">{item.pname}</Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1">
                  Price: €{item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Total: €{(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeFromCart(item.pname)}
                  sx={{ marginTop: 2 }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Typography variant="h5">
          Total: €
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ marginTop: 3 }}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
          sx={{ marginTop: 3, marginLeft: 2 }}
        >
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
}
