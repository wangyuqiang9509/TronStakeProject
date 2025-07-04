import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import { theme } from './styles/theme';
import AppRoutes from './routes';
import './styles/globals.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <AppRoutes />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
