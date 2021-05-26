import styled from 'styled-components/macro';
import { colours, shapes, focussing } from './constants';

export const Header = styled.h1`
  padding-bottom: 0.5em;
  font-size: 2.5rem;
  text-align: center;
`;

export const LoadingDiv = styled.div`
  display: grid;
  place-content: center;
  margin-top: 2em;
`;

export const Loading = styled.div`
  /* Spinner from https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje */
  display: grid;
  place-content: center;
  width: 2.5em;
  height: 2.5em;
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

export const ResultsCount = styled.div`
  padding: 0.5em 0;
  text-align: center;
`;

export const ResultsTotal = styled.div`
  padding-bottom: 0.125em;
`;

export const ResultsCurrent = styled.div``;

export const CardDiv = styled.div`
  max-width: 90%;
  width: 50ch;
  padding: 1em;
  border: 1px solid #dedede;
  border-radius: ${shapes.borderRadius};
  box-shadow: 0.05em 0.05em 0.1em rgba(0, 0, 0, 0.25);
  text-align: center;

  a {
    color: ${colours.link};
  }

  a:visited {
    color: ${colours.linkVisited};
  }

  a:hover,
  a:focus,
  a:active,
  a:visited:focus,
  a:visited:hover,
  a:visited:active {
    color: ${colours.linkDarker};
    text-decoration-thickness: 0.125em;
    text-underline-offset: 0.125em;
  }

  a:active {
    outline: 0.1em dashed ${colours.linkDarker};
    outline-offset: 0.25em;
  }
`;

export const PrevNext = styled.div`
  text-align: center;
`;

export const Previous = styled.button`
  border: none;
  margin: 0.5em;
  padding: 0.5em 1.5em;
  border-radius: ${shapes.borderRadius};
  background-color: ${colours.highlight};
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0.05em 0.05em 0.1em rgba(0, 0, 0, 0.25);

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

export const Next = styled(Previous)``;
