import React, { useState } from 'react';
import axios from 'axios';
import { Label, Input, Submit } from './Search.styles';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');

  async function getData(search: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q${search}`
      );
      console.log(response.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(response.data.items[1].volumeInfo.title);
      console.log(response.data.items[1].volumeInfo.authors[0]);
      console.log(response.data.items[1].volumeInfo.publisher);
      console.log(response.data.items[1].volumeInfo.infoLink);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form>
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
      <Submit onClick={() => getData(searchText)}>Search</Submit>
    </form>
  );
};

export default Search;
