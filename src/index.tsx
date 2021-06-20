// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './Wrapper';
import GlobalStyle from './globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Wrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
