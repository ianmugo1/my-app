'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCart } from 'src/app/context/CartContext'; // Adjust the path based on your structure
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();
  const router = useRouter();

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      router.push('/api/auth/signin?callbackUrl=/smallapp');
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#d62227',
        padding: 1,
      }}
    >
      <Toolbar>
        {/* Brand Name */}
        <Typography
          variant="h6"
          component={Link}
          href="/smallapp"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Krispy Kreme
        </Typography>

        {/* Home Button */}
        <Button
          color="inherit"
          component={Link}
          href="/smallapp"
          sx={{ textTransform: 'capitalize' }}
        >
          Home
        </Button>

        {/* Register Button */}
        <Button
          color="inherit"
          component={Link}
          href="/smallapp/register"
          sx={{ textTransform: 'capitalize' }}
        >
          Register
        </Button>

        {/* Cart Button */}
        <Button
          color="inherit"
          component={Link}
          href="/smallapp/cart"
          sx={{ textTransform: 'capitalize' }}
        >
          <Badge
            badgeContent={cartCount}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: 'white',
                color: '#d62227',
                fontWeight: 'bold',
              },
            }}
          >
            Cart
          </Badge>
        </Button>

        {/* Manager Dashboard Button (For Admin) */}
        {session?.user?.acc_type === 'manager' && (
          <Button
            color="inherit"
            component={Link}
            href="/smallapp/manager"
            sx={{ textTransform: 'capitalize' }}
          >
            Manager
          </Button>
        )}

        {/* Login/Logout Button */}
        <Button
          color="inherit"
          onClick={handleAuth}
          sx={{ textTransform: 'capitalize' }}
        >
          {session ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}