import { createGlobalStyle } from 'styled-components/macro';
import { colours } from './constants';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 1em;
    background-color: ${colours.background};
    color: ${colours.text};
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalStyle;
