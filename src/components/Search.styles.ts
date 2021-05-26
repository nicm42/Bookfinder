import styled from 'styled-components/macro';
import { colours, focussing, shapes } from '../constants';

export const Form = styled.form`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
  padding-bottom: 1em;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

export const Label = styled.label`
  padding-bottom: 0.5em;
  text-align: center;
`;

export const Select = styled.select`
  padding: 0.5em;
  color: inherit;
  font-family: inherit;
  font-size: 0.85rem;
  line-height: inherit;

  &:hover,
  &:focus {
    outline: ${focussing.border};
    border-radius: ${focussing.radius};
  }

  .hide {
    display: none;
  }
`;

export const Input = styled.input`
  max-width: 25ch; /* So it doesn't have more width than is available on small screens */
  padding: 0.5em;
  border: 1px solid ${colours.text};
  border-radius: ${shapes.borderRadius};
  font-size: 1rem;

  &:hover,
  &:focus {
    outline: ${focussing.border};
    border-radius: ${focussing.radius};
  }
`;

export const Submit = styled.button`
  border: none;
  padding: 0.5em 1.5em;
  border-radius: ${shapes.borderRadius};
  background-color: ${colours.highlight};
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;

  &:hover,
  &:focus {
    background-color: hsla(210, 77%, 73%, 1);
    outline: ${focussing.border};
    border-radius: ${focussing.radius};
  }

  &:active {
    position: relative;
    top: 0.125em;
  }
`;
