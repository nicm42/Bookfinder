import styled from 'styled-components/macro';
import { mediaQuery } from '../constants';

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

export const Title = styled.div`
  padding-top: 0.5em;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.1;

  @media ${mediaQuery.medium} {
    padding-top: 0;
  }
`;

export const Author = styled.div`
  padding: 0.25em 0;
  font-style: italic;
  font-weight: 700;
`;

export const Publisher = styled.div`
  padding-top: 0.25em;
  padding-bottom: 1em;
`;
