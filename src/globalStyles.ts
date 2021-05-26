import { createGlobalStyle } from 'styled-components/macro';
import { colours } from './constants';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 1em;
    background-color: ${colours.background};
    color: ${colours.text};
    font-family: 'Poppins', sans-serif;
    font-size: 100%;
    line-height: 1.6;
  }

`;

export default GlobalStyle;
