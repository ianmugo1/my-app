'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box } from '@mui/material';
import { useCart } from '../../context/CartContext';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = 'e18891808ed0a6ebb6fc8fe06c2abbfe'; // Replace with your OpenWeatherMap API key

export default function CustomerPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  // Weather-related state
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    setIsHydrated(true); // Mark as hydrated after client renders
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/smallapp/api/products');
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();

        const productsWithDetails = data.map((product) => {
          let imageUrl;
          switch (product.pname) {
            case 'Chocolate Sprinkles':
              imageUrl = 'https://tse1.mm.bing.net/th?id=OIP.3AR05qKhxq4bZApdSBfLsQHaHa&pid=Api';
              break;
            case 'Original Glazed':
              imageUrl = 'https://tse1.mm.bing.net/th?id=OIP.Ve37GwdOUoFaB2mcppdICwHaHa&pid=Api';
              break;
            case 'Strawberry Iced':
              imageUrl = 'https://tse3.mm.bing.net/th?id=OIP.Kd77IcHdE4qHes1NcztKqwHaHa&pid=Api';
              break;
            default:
              imageUrl = 'https://via.placeholder.com/150';
          }
          return {
            ...product,
            description: `${product.pname} - A delicious donut to enjoy!`,
            image: imageUrl,
          };
        });

        setProducts(productsWithDetails);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (isHydrated) {
      fetchProducts();
      fetchWeather(); // Fetch weather data when hydrated
    }
  }, [isHydrated]);

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser.');
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch weather: ${response.statusText}`);
          }

          const weatherData = await response.json();
          setWeather(weatherData);
        },
        (err) => {
          console.error('Error getting location:', err);
          setLocationError('Unable to retrieve your location.');
        }
      );
    } catch (err) {
      console.error('Error fetching weather:', err);
      setLocationError(err.message);
    }
  };

  // Handle loading state
  if (!isHydrated || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Unable to load products.
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  // Handle empty product list
  if (products.length === 0) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h5">No products available.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Weather Information */}
      {weather && (
        <Box
          sx={{
            backgroundColor: '#f0f8ff',
            padding: 2,
            marginBottom: 3,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">
            Current Weather in {weather.name}: {weather.main.temp}°C, {weather.weather[0].description}
          </Typography>
        </Box>
      )}
      {locationError && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 3, textAlign: 'center' }}>
          {locationError}
        </Typography>
      )}

      {/* Product Grid */}
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.pname}
                sx={{ objectFit: 'contain', backgroundColor: '#f9f9f9' }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {product.pname}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6">€{product.price.toFixed(2)}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}