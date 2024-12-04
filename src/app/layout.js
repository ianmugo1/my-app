'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <div style={{ flex: 1 }}>{children}</div>
          </CartProvider>
        </SessionProvider>
        <footer
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <p>© 2024 Krispy Kreme Ireland</p>
        </footer>
      </body>
    </html>
  );
}