import styled from 'styled-components/macro';
import { colours } from '../constants';

export const Form = styled.form``;

export const Label = styled.label``;

export const Input = styled.input`
  padding: 0.5em;
  font-size: 1rem;
`;

export const Select = styled.select`
  .hide {
    display: none;
  }
`;

export const Submit = styled.button`
  border: none;
  padding: 0.5em 1.5em;
  border-radius: 0.25em;
  background-color: ${colours.highlight};
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
`;
