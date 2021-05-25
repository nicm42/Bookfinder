import { createGlobalStyle } from 'styled-components/macro';
import { colours } from './constants';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colours.background};
    color: ${colours.text}
  }
`;

export default GlobalStyle;
