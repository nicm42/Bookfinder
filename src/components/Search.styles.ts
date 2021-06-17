import styled from 'styled-components/macro';
import { fonts, focussing, shapes, mediaQuery } from '../constants';
import dropdown from '../images/dropdown.png';
import { button } from '../globalStyles';
import books from '../images/books.jpg'; //Photo by Jonas Jacobsson on Unsplash

export const SearchDiv = styled.div`
  @media ${mediaQuery.large} {
    background-image: url(${books});
    background-repeat: no-repeat;
    background-position: 100%;
    /* move it up so we still see the margin between the bottom of the search/image and the text/cards below */
    background-size: 50% calc(100% - 1em);
  }
`;

export const Form = styled.form`
  position: relative;
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

export const Title = styled.p`
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
  -webkit-appearance: none; /* So iOS doesn't make the input corners really rounded */
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
