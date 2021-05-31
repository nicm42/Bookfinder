import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import App from './App';
import GlobalStyle from './globalStyles';
import favicon from './images/favicon.ico';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <HelmetProvider>
      <Helmet>
        <title>Book Search</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/ico" href={favicon} />
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
