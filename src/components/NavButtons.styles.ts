import styled, { css } from 'styled-components/macro';
import { colours, mediaQuery } from '../constants';
import { button } from '../globalStyles';

export const PrevNext = styled.div`
  text-align: center;

  @media ${mediaQuery.large} {
    text-align: left;
  }
`;

export const Previous = styled.button<{ isPreviousResults: boolean }>`
  ${button};
  margin: 0.5em;
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colours.buttonLighter};
      color: ${colours.disabled};
      cursor: not-allowed;
      &:hover,
      &:focus {
        background-color: ${colours.buttonLighter};
      }
      &:active {
        top: 0;
      }
    `}
`;

export const Next = styled.button<{ isMoreResults: boolean }>`
  ${button};
  ${Previous};
  margin: 0.5em;
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${colours.buttonLighter};
      color: ${colours.disabled};
      cursor: not-allowed;
      &:hover,
      &:focus {
        background-color: ${colours.buttonLighter};
      }
      &:active {
        top: 0;
      }
    `}
`;
