import styled from 'styled-components/macro';
import { colours, fonts, mediaQuery } from './constants';
import { button } from './globalStyles';

export const Header = styled.h1`
  padding-bottom: 0.5em;
  font-size: ${fonts.h1};
  text-align: center;
`;

export const LoadingDiv = styled.div`
  display: grid;
  place-content: center;
  margin-top: 2em;
`;

export const Loading = styled.div`
  /* Spinner from https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje */
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, ${colours.loading});
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
  font-size: ${fonts.extraLarge};
  color: ${colours.error};
  text-align: center;

  @media ${mediaQuery.large} {
    padding-left: 0.5rem;
    font-size: ${fonts.extraLarge};
    text-align: left;
  }
`;

export const Books = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 0.5em;

  @media ${mediaQuery.large} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch; /* makes everything same height */
  }
`;

export const ResultsCount = styled.div`
  padding: 0.5em 0;
  text-align: center;

  @media ${mediaQuery.large} {
    padding-left: 0.5em;
    text-align: left;
  }
`;

export const PrevNext = styled.div`
  text-align: center;

  @media ${mediaQuery.large} {
    text-align: left;
  }
`;

export const Previous = styled.button`
  ${button}
  margin: 0.5em;
`;

export const Next = styled.button`
  ${button}
  margin: 0.5em;
`;
