import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Search.styles';
import books from '../images/books.jpg'; //Photo by Jonas Jacobsson on Unsplash

interface SearchProps {
  getData: Function;
}

const Search = ({ getData }: SearchProps) => {
  // Using uncontrolled inputs here so as not to have additional renders
  // - this form isn't that complicated, so there's no point in overcomplicating it
  // https://daveceddia.com/react-forms/
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const search: any = event.currentTarget.children[2];
    const select: any = event.currentTarget.children[1];
    const searchTerm = search.value;
    const type = select.value;
    //Clear input and dropdown now we're submitting
    search.value = '';
    select.value = '';
    getData(searchTerm, type, 0);
  };

  return (
    <Styled.SearchDiv>
      <Styled.Form onSubmit={(e) => submitSearch(e)}>
        <Styled.Label htmlFor="search-input">
          Search for a book by title or author
        </Styled.Label>
        <Styled.Select name="select" required data-testid="select">
          <option value="" className="hide">
            Title or author
          </option>
          <option value="intitle">Title</option>
          <option value="inauthor">Author</option>
        </Styled.Select>
        <Styled.Input type="search" id="search-input" name="search" required />
        <Styled.Submit>Search</Styled.Submit>
      </Styled.Form>
      <Styled.BookImage width="640" height="426" src={books} alt="" />
    </Styled.SearchDiv>
  );
};

Search.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default Search;
