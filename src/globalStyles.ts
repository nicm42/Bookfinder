import { createGlobalStyle, css } from 'styled-components/macro';
import { colours, shapes, focussing, mediaQuery } from './constants';

const GlobalStyle = createGlobalStyle`
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
  padding: 0.25em 1em;
  border: ${shapes.border};
  border-radius: ${shapes.borderRadius};
  background-color: ${colours.button};
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  font-size: inherit;
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
