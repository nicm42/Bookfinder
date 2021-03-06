import styled from 'styled-components/macro';
import { fonts, mediaQuery } from './constants';

export const Header = styled.h1`
  padding-bottom: 0.5em;
  font-size: ${fonts.h1};
  line-height: 1;
  text-align: center;
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
