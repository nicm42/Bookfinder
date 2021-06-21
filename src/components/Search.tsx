// eslint-disable-next-line no-use-before-define
import React from 'react';
//import PropTypes from 'prop-types';
//import useAxios from '../hooks/useAxios';
import * as Styled from './Search.styles';

interface SearchProps {
  getData: Function;
}

const Search = ({ getData }: SearchProps) => {
  //const Search = () => {
  //const { getData } = useAxios();

  // Using uncontrolled inputs here so as not to have additional renders
  // - this form isn't that complicated, so there's no point in over-complicating it
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
        <Styled.Title>Search for a book by title or author</Styled.Title>
        <Styled.Select
          required
          aria-label="Select title or author"
          data-testid="select"
        >
          <option value="" className="hide">
            Title or author
          </option>
          <option value="intitle">Title</option>
          <option value="inauthor">Author</option>
        </Styled.Select>
        <Styled.Input
          type="search"
          name="search"
          aria-label="Type in the title or author you want to search for"
          required
        />
        <Styled.Submit>Search</Styled.Submit>
      </Styled.Form>
    </Styled.SearchDiv>
  );
};

/* Search.propTypes = {
  getData: PropTypes.func.isRequired,
}; */

export default Search;
