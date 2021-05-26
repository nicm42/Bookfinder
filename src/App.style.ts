import styled from 'styled-components/macro';
import { colours, shapes } from './constants';

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

export const Books = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding: 0.5em;
`;

export const ResultsCount = styled.div``;

export const ResultsTotal = styled.div``;

export const ResultsCurrent = styled.div``;

export const CardDiv = styled.div`
  max-width: 90%;
  width: 50ch;
  padding: 1em;
  border: 1px solid #dedede;
  border-radius: ${shapes.borderRadius};
  box-shadow: 0.05em 0.05em 0.1em rgba(0, 0, 0, 0.25);
`;

export const Previous = styled.button``;

export const Next = styled.button``;
