import styled from 'styled-components/macro';
import { mediaQuery } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const ResultsCount = styled.p`
  padding: 0.5em 0;
  text-align: center;

  @media ${mediaQuery.large} {
    padding-left: 0.5em;
    text-align: left;
  }
`;
