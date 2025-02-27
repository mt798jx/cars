// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },    // odtieň modrej
        secondary: { main: '#d81b60' }, // odtieň ružovej
    },
    shape: {
        borderRadius: 12, // Okruhlejšie rohy
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',   // nepísať uppercase
                    borderRadius: '999px',   // extrémne okrúhle
                }
            }
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
