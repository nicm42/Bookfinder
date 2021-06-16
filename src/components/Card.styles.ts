import styled from 'styled-components/macro';
import { colours, fonts, shapes, mediaQuery } from '../constants';

export const CardDiv = styled.div`
  max-width: 90%;
  width: 50ch;
  padding: 1em;
  border: 1px solid #dedede;
  border-radius: ${shapes.borderRadius};
  background-color: ${colours.darkBackground};
  box-shadow: ${shapes.boxShadow};
  text-align: center;

  p:last-child {
    margin-top: auto;
  }

  a {
    color: ${colours.link};
    margin-top: auto;
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

  @media ${mediaQuery.medium} {
    display: flex;
    gap: 1em;

    a {
      margin-top: auto;
    }
  }
`;

export const Cover = styled.img`
  max-height: 200px;
`;

export const Info = styled.div`
  @media ${mediaQuery.medium} {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
`;

export const Title = styled.p`
  padding-top: 0.5em;
  font-size: ${fonts.large};
  font-weight: 700;
  line-height: 1.1;

  @media ${mediaQuery.medium} {
    padding-top: 0;
  }
`;

export const Author = styled.p`
  padding: 0.25em 0;
  font-weight: 700;
`;

export const Publisher = styled.p`
  padding-top: 0.25em;
  padding-bottom: 1em;
`;
