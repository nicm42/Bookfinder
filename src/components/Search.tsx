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
    setSearchText(''); //clear input now we're submitting
    //console.log(searchText);
    //console.log(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
      );
      //console.log(response.data.items[1]);
      /* console.log(response.data.items.length);
      console.log(response.data.items[1].id);
      console.log(response.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(response.data.items[1].volumeInfo.title);
      console.log(response.data.items[1].volumeInfo.authors[0]);
      console.log(response.data.items[1].volumeInfo.publisher); 
      console.log(response.data.items[1].volumeInfo.infoLink); */
      /* response.data.items.forEach((book: any) => {
        setCardData({
          id: book.id,
          //cover: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors[0],
          publisher: book.volumeInfo.publisher,
          link: book.volumeInfo.infoLink,
        });
      }); */
      /* response.data.items.forEach((book: any) => {
        console.log({
          id: book.id,
          cover: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors[0],
          publisher: book.volumeInfo.publisher,
          link: book.volumeInfo.infoLink,
        });
      }); */
      //TODO update the any on book
      /* setCardData(response.data.items.forEach((book: any) => {
        {
          id: book.id,
          cover: book.volumeInfo.imageLinks.thumbnail,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors[0],
          publisher: book.volumeInfo.publisher,
          link: book.volumeInfo.infoLink,
        }
      })); */
      setCardData(response.data.items);
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
