import { useState, useEffect } from 'react';
import Search from './components/Search';
import Card from './components/Card';
import { Loading, NoResult, Books, CardDiv } from './App.style';
//import cards from './dummyCardData'; //uncomment to load cards without using API

const App = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  //const [cardData, setCardData] = useState<any[]>(cards);  //uncomment to load cards without using API
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isData, setIsData] = useState<Boolean>(true);
  const [searchedFor, setSearchedFor] = useState<string>('');

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  useEffect(() => {
    if (cardData.length > 0) {
      setIsLoading(false);
      if (cardData[0] === false) {
        setIsData(false);
      } else {
        setIsData(true);
      }
    }
  }, [cardData]);

  return (
    <>
      <Search
        setCardData={setCardData}
        setIsLoading={setIsLoading}
        setSearchedFor={setSearchedFor}
      />
      {isLoading && <Loading data-testid="loading">Loading</Loading>}{' '}
      {/* TODO replace this text with an animation */}
      {!isData && (
        <NoResult>
          No books were found for {searchedFor} :( Please try a different search
        </NoResult>
      )}
      {cardData[0] !== false && (
        <Books>
          {cardData.map((card) => (
            <CardDiv key={card.id} data-testid="cardDiv">
              <Card card={card} key={card.id} data-testid="card" />
            </CardDiv>
          ))}
        </Books>
      )}
    </>
  );
};

export default App;
