import React from 'react';
import { Label, Input, Submit } from './Search.styles';

const Search = () => {
  return (
    <>
      <Label htmlFor="search-input">Search for a book </Label>
      <Input
        type="search"
        id="search-input"
        name="search"
        required
        autocomplete="on"
      />
      <Submit>Search</Submit>
    </>
  );
};

export default Search;
