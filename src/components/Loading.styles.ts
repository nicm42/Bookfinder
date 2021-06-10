import styled, { keyframes } from 'styled-components/macro';
import { colours } from '../constants';

const spinner = keyframes`
    to {
      transform: rotate(1turn);
    }
`;

// eslint-disable-next-line import/prefer-default-export
export const Loading = styled.div`
  /* Spinner from https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje */
  place-self: center;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, ${colours.loading});
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 0.33em),
    #000 0
  );
  animation: ${spinner} 1s infinite linear;

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;
