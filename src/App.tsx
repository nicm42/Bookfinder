import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Card from './components/Card';
import { Loading, Error, Books, CardDiv } from './App.style';

const App = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  //const [cardData, setCardData] = useState<any[]>(cards);  //uncomment to load cards without using API
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<string>();

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  /* useEffect(() => {
    if (cardData.length > 0) {
      setIsLoading(false);
      if (cardData[0] === false) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  }, [cardData]); */

  const getData = async (search: string) => {
    setIsLoading(true);
    setCardData([]); //in case this is another search, clear the results from the previous search
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
      //setIsError(`No books were found for ${search} :(`); //uncomment to test nothing returned from API
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(error); //TODO why does this line make Jest App test unhappy?
    }
  };

  return (
    <>
      <Search getData={getData} />
      {isLoading && <Loading data-testid="loading">Loading</Loading>}{' '}
      {/* TODO replace this text with an animation */}
      {isError && <Error data-testid="error">{isError}</Error>}
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
