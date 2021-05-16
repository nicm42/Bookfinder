import { useState, useEffect } from 'react';
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

  return (
    <>
      <Search
        setCardData={setCardData}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />
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
