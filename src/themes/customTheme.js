import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'dark', // Dark mode base
    primary: {
      main: '#00695C', // Deep teal
      light: '#439889',
      dark: '#003D33',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#AB47BC', // Neon purple
      light: '#DF78EF',
      dark: '#790E8B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: 'linear-gradient(135deg, #1A2525 0%, #263535 100%)', // Dark gradient
      paper: '#2E3B3B', // Slightly lighter for cards/paper
    },
    text: {
      primary: '#E0F7FA', // Light cyan for readability
      secondary: '#B0BEC5', // Muted gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Orbitron', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
  components: {
    // Custom button styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Rounded corners
          padding: '8px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 18px rgba(0, 105, 92, 0.5)', // Teal glow on hover
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00695C, #00897B)', // Gradient button
        },
      },
    },
    // Custom card styles
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: '#2E3B3B',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        },
      },
    },
  },
});

export default customTheme;