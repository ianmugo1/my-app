'use client';

import React from 'react';
import { CartProvider } from '../context/CartContext'; // Correct path to CartContext

export default function MyApp({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
