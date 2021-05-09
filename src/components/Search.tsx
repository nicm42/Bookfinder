import React, { useState } from 'react';
import axios from 'axios';
import { Label, Input, Submit } from './Search.styles';

interface SearchProps {
  setCardData: Function;
}

const Search = ({ setCardData }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  //TODO should this be in useEffect?
  const getData = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
      );
      //console.log(response.status);
      /* console.log(response.data.items.length);
      console.log(response.data.items[1].id);
      console.log(response.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(response.data.items[1].volumeInfo.title);
      console.log(response.data.items[1].volumeInfo.authors[0]);
      console.log(response.data.items[1].volumeInfo.publisher); 
      console.log(response.data.items[1].volumeInfo.infoLink); */
      if (response.status === 200) {
        setCardData(response.data.items);
        setSearchText(''); //clear input now we're submitting
      } else {
        throw new Error('error');
      }
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
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
      <Submit>Search</Submit>
    </form>
  );
};

export default Search;
