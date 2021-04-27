import React, { useState } from 'react';
import { Label, Input, Submit } from './Search.styles';

const Search = () => {
  const [searchText, setSearchText] = useState();

  const runSearch = () => {
    console.log(searchText);
    //TODO send this to Google Books API
  };

  return (
    <>
      <Label htmlFor="search-input">Search for a book </Label>
      <Input
        type="search"
        id="search-input"
        name="search"
        required
        autocomplete="on"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Submit onClick={runSearch}>Search</Submit>
    </>
  );
};

export default Search;
