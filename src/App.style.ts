import styled from 'styled-components/macro';
import { colours } from './constants';

export const Header = styled.h1`
  padding-bottom: 0.5em;
  font-size: 2.5rem;
  text-align: center;
`;

export const Loading = styled.div`
  /* Spinner from https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje */
  width: 2.5em;
  height: 2.5em;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: conic-gradient(#0000 10%, ${colours.highlight});
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 0.33em),
    #000 0
  );
  animation: spinner 1s infinite linear;

  @media (prefers-reduced-motion) {
    animation: none;
  }

  @keyframes spinner {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Error = styled.div`
  font-size: 1.5rem;
  color: ${colours.error};
  text-align: center;
`;

export const Books = styled.div``;

export const ResultsCount = styled.div``;

export const ResultsTotal = styled.div``;

export const ResultsCurrent = styled.div``;

export const CardDiv = styled.div``;

export const Previous = styled.button``;

export const Next = styled.button``;
