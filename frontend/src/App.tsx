import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './style';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeScreen from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <HomeScreen />
      </Router>
    </ThemeProvider>
  );
}

export default App;