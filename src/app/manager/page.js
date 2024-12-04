'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, CircularProgress, Alert } from '@mui/material';

export default function ManagerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders', { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Error fetching orders: ${response.statusText}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography>No orders found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customer.name || 'N/A'}</TableCell>
              <TableCell>
                {order.items.map((item) => `${item.pname} x${item.quantity}`).join(', ')}
              </TableCell>
              <TableCell>€{order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}