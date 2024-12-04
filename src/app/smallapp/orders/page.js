'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/smallapp/api/orders');
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
  
        const data = await response.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  
    fetchOrders();
  }, []);
  

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Unable to load orders.
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5">No orders found!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Your Orders
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order._id}>
            <ListItemText
              primary={`Order ID: ${order._id}`}
              secondary={`Total: €${order.totalPrice.toFixed(2)} - Placed on: ${new Date(order.createdAt).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
