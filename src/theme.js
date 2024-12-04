import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d62227', // Krispy Kreme Red
    },
    secondary: {
      main: '#008d48', // Krispy Kreme Green
    },
    background: {
      default: '#ffffff', // White background
    },
    text: {
      primary: '#333333', // Dark text for readability
      secondary: '#666666', // Lighter text for secondary content
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', 
    h4: {
      fontWeight: 600,
      color: '#d62227', // Red for headings
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
  },
});

export default theme;
