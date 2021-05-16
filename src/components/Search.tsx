import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Label, Input, Submit } from './Search.styles';

interface SearchProps {
  setCardData: Function;
  setIsLoading: Function;
  setSearchedFor: Function;
}

const Search = ({ setCardData, setIsLoading, setSearchedFor }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  //TODO should this be in useEffect?
  const getData = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setIsLoading(true);
    setCardData([]); //in case this is another search, clear the results from the previous search
    const search = searchText;
    setSearchedFor(searchText);
    setSearchText(''); //clear input now we're submitting
    try {
      //TODO will need to repeat this if there are more than 10 results
      //Although how many do we want to show on the page? Maybe a link to get more books?
      //Or just get 10 at a time
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
      );
      //console.log(response.data.totalItems);
      /* console.log(response.data.items[1].id);
      console.log(response.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(response.data.items[1].volumeInfo.title);
      console.log(response.data.items[1].volumeInfo.authors[0]);
      console.log(response.data.items[1].volumeInfo.publisher); 
      console.log(response.data.items[1].volumeInfo.infoLink); */
      setCardData(response.data.items);
      //setCardData([false]); //uncomment to test nothing returned from API
      //setIsLoading(false);
    } catch (error) {
      console.log(error);
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

Search.propTypes = {
  setCardData: PropTypes.func.isRequired,
};

export default Search;
