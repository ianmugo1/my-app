'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SmallAppHome() {
  const router = useRouter();

  return (
    <Box>
      {/* App Bar */}
      <AppBar position="static" sx={{ bgcolor: '#d62d20' }}>
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/')}
          >
            <Image
              src="https://banner2.cleanpng.com/20180623/rpi/aazsg6zps.webp"
              alt="Krispy Kreme Logo"
              width={150}
              height={50}
              style={{ marginRight: '10px' }}
              priority
            />
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              Krispy Kreme
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => router.push('/smallapp/customer')}>
            Customer
          </Button>
          <Button color="inherit" onClick={() => router.push('/smallapp/manager')}>
            Manager
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://www.krispykreme.ie/media/wysiwyg/homepage_banner.jpg"
          alt="Hero Banner"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Typography variant="h3" gutterBottom>
            Delicious Donuts, Fresh Every Day!
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: '#d62d20', color: 'white', mt: 2 }}
            onClick={() => router.push('/smallapp/customer')}
          >
            Order Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
