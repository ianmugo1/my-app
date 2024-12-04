'use client';

import React from 'react';
import { useCart } from 'src/app/context/CartContext.js';
import { Typography } from '@mui/material';

export default function ViewCartPage() {
  const { cart } = useCart();

  console.log('Cart contents in View Cart Page:', cart); // Debugging

  return (
    <div>
      <Typography variant="h4">Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography>
              Quantity: {item.quantity} - Price: €{item.price.toFixed(2)}
            </Typography>
          </div>
        ))
      )}
    </div>
  );
}
