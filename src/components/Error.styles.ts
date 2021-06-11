import styled from 'styled-components/macro';
import { colours, fonts, mediaQuery } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const Error = styled.p`
  font-size: ${fonts.extraLarge};
  color: ${colours.error};
  text-align: center;

  @media ${mediaQuery.large} {
    padding-left: 0.5rem;
    font-size: ${fonts.extraLarge};
    text-align: left;
  }
`;
