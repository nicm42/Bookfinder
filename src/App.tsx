import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Card from './components/Card';
import { Loading, Error, Books, CardDiv } from './App.style';

const App = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  //const [cardData, setCardData] = useState<any[]>(cards);  //uncomment to load cards without using API
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  const getData = async (search: string, type: string) => {
    setIsLoading(true);
    setCardData([]); //in case this is another search, clear the results from the previous search
    //console.log(`Running getData with ${search} and ${type}`);
    try {
      //TODO will need to repeat this if there are more than 10 results
      //Although how many do we want to show on the page? Maybe a link to get more books?
      //Or just get 10 at a time
      const api = 'https://www.googleapis.com/books/v1/volumes?q=';
      const response = await axios.get(`${api}${type}:%22${search}%22`);
      //console.log(response.data.items);

      //Uncomment line below to test API errors
      //const response = await axios.get(`http://httpstat.us/404`);
      //Uncomment lines below to test API timeout
      /* const response = await axios.get(`http://httpstat.us/504`, {
        timeout: 2,
      }); */

      //console.log(response.data.totalItems);
      /* console.log(response.data.items[1].id);
      console.log(response.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(response.data.items[1].volumeInfo.title);
      console.log(response.data.items[1].volumeInfo.authors[0]);
      console.log(response.data.items[1].volumeInfo.publisher); 
      console.log(response.data.items[1].volumeInfo.infoLink); */

      //setCardData(response.data.items);
      setCardData(response.data.items);
      //setErrorMessage(`No books were found for ${search} :(`); //uncomment to test nothing returned from API
    } catch (error) {
      console.log(error);
      /* setErrorMessage(
        `Something went wrong :( Please speak to the developer with the search term: '${search}' and the error message: '${error.response.status} ${error.response.statusText}'`
      ); */
      if (error.message === 'timeout of 2ms exceeded') {
        setErrorMessage('The request timed out. Please try again later');
      } else {
        setErrorMessage(
          `Something went wrong :( Please speak to the developer with the search term: '${search}' and the error message: '${error.response.status} ${error.response.statusText}'`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Search getData={getData} />
      {isLoading && <Loading data-testid="loading">Loading</Loading>}{' '}
      {/* TODO replace this text with an animation */}
      {errorMessage && <Error data-testid="error">{errorMessage}</Error>}
      <Books>
        {cardData.map((card) => (
          <CardDiv key={card.id} data-testid="cardDiv">
            <Card card={card} key={card.id} data-testid="card" />
          </CardDiv>
        ))}
      </Books>
    </>
  );
};

export default App;
