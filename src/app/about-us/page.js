'use client';

import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://www.krispykreme.ie/media/wysiwyg/about-us-banner.jpg"
          alt="About Us Banner"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h3" align="center">
            About Krispy Kreme Ireland
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Welcome to Krispy Kreme Ireland! We are passionate about delivering
          fresh, delicious donuts every day. From our classic Original Glazed
          to innovative flavors, we strive to bring joy to every bite.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Founded with the belief that every donut should be a moment of
          happiness, we are committed to crafting the finest treats for our
          customers. Visit our stores or order online to experience the magic
          of Krispy Kreme.
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: '#d62d20', color: 'white' }}
          href="/smallapp/customer"
        >
          Explore Our Menu
        </Button>
      </Box>
    </Box>
  );
}
