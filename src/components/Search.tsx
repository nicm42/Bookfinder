import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Search.styles';

interface SearchProps {
  getData: Function;
}

const Search = ({ getData }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  const submitSearch = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const search = searchText;
    const type = searchType;
    setSearchText(''); //clear input now we're submitting
    setSearchType(''); //clear dropdown now we're submitting
    getData(search, type, 0);
  };

  return (
    <Styled.Form onSubmit={(e) => submitSearch(e)}>
      <Styled.Label htmlFor="search-input">
        Search for a book by title or author
      </Styled.Label>
      <Styled.Select
        required
        data-testid="select"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSearchType(e.target.value)
        }
        value={searchType}
      >
        <option value="" className="hide">
          Title or author
        </option>
        <option value="intitle">Title</option>
        <option value="inauthor">Author</option>
      </Styled.Select>
      <Styled.Input
        type="search"
        id="search-input"
        name="search"
        required
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
      <Styled.Submit>Search</Styled.Submit>
    </Styled.Form>
  );
};

Search.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default Search;
