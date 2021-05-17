import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import axios from 'axios';
import { Label, Input, Submit } from './Search.styles';

interface SearchProps {
  /* setCardData: Function;
  setIsLoading: Function;
  setIsError: Function; */
  getData: Function;
}

const Search = ({ getData }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const submitSearch = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const search = searchText;
    setSearchText(''); //clear input now we're submitting
    getData(search);
  };

  return (
    <form onSubmit={(e) => submitSearch(e)}>
      <Label htmlFor="search-input">Search for a book </Label>
      <Input
        type="search"
        id="search-input"
        name="search"
        required
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
      <Submit>Search</Submit>
    </form>
  );
};

/* Search.propTypes = {
  setCardData: PropTypes.func.isRequired,
}; */

Search.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default Search;
