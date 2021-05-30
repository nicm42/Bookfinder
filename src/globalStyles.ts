import { createGlobalStyle, css } from 'styled-components/macro';
import { colours, fonts, shapes, focussing, mediaQuery } from './constants';

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
    line-height: 1.3;

    @media ${mediaQuery.large} {
      padding: 2em;
    }
  }

`;

export default GlobalStyle;

export const button = css`
  border: none;
  padding: 0.5em 1.5em;
  border-radius: ${shapes.borderRadius};
  background-color: ${colours.highlight};
  cursor: pointer;
  font-weight: 700;
  font-size: ${fonts.small};
  box-shadow: ${shapes.boxShadow};

  &:hover,
  &:focus {
    background-color: hsla(210, 77%, 73%, 1);
    outline: ${focussing.border};
    border-radius: ${focussing.radius};
  }

  &:active {
    position: relative;
    top: 0.125em;
    box-shadow: none;
  }
`;
