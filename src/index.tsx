import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import GlobalStyle from './globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
