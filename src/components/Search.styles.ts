import styled from 'styled-components/macro';
import { fonts, focussing, shapes, mediaQuery } from '../constants';
import dropdown from '../images/dropdown.png';
import { button } from '../globalStyles';
import library from '../images/library.jpg'; //Photo by 🇸🇮 Janko Ferlič on Unsplash

export const SearchDiv = styled.div`
  /* padding: 0.5em;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url(${library});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  display: flex;
  justify-content: space-between;
`;

export const BookImage = styled.img`
  display: none;

  @media ${mediaQuery.large} {
    display: block;
    max-height: max-content;
  }
`;

export const Form = styled.form`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
  padding-bottom: 1em;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media ${mediaQuery.large} {
    padding-left: 0.5em;
    left: 0;
    transform: translateX(0);
  }
`;

export const Label = styled.label`
  padding-bottom: 0.5em;
  font-size: ${fonts.large};
  font-weight: 500;
  text-align: center;
`;

export const Select = styled.select`
  padding: 0.5em;
  color: inherit;
  font-family: inherit;
  font-size: ${fonts.small}; /* Otherwise it looks huge */
  line-height: inherit;
  border: ${shapes.border};
  border-radius: ${shapes.borderRadius};
  box-shadow: ${shapes.boxShadow};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 2em;
  background: url(${dropdown});
  background-repeat: no-repeat;
  background-position: 95% 50%;
  background-size: 0.85rem;
  background-color: white;

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
  border: ${shapes.border};
  border-radius: ${shapes.borderRadius};
  font-size: ${fonts.medium};
  box-shadow: ${shapes.boxShadow};

  &:hover,
  &:focus {
    outline: ${focussing.border};
    border-radius: ${focussing.radius};
  }
`;

export const Submit = styled.button`
  ${button}
`;
