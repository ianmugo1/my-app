'use client';

import { useCart } from '@/app/context/CartContext';
import { Box, Typography, Button } from '@mui/material';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <Box>
      <Typography variant="h4">Cart</Typography>
      {cart.map((item) => (
        <Box key={item.id}>
          <Typography>{item.name}</Typography>
          <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
        </Box>
      ))}
      <Button onClick={clearCart}>Clear Cart</Button>
    </Box>
  );
}
