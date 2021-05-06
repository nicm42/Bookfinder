import React, { useState } from 'react';
import axios from 'axios';
import { Label, Input, Submit } from './Search.styles';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');

  const getData = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(searchText);
    console.log(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
      );
      console.log(response.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(response.data.items[1].volumeInfo.title);
      console.log(response.data.items[1].volumeInfo.authors[0]);
      console.log(response.data.items[1].volumeInfo.publisher);
      console.log(response.data.items[1].volumeInfo.infoLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={(e) => getData(e)}>
      <Label htmlFor="search-input">Search for a book </Label>
      <Input
        type="search"
        id="search-input"
        name="search"
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
      <Submit>Search</Submit>
    </form>
  );
};

export default Search;
