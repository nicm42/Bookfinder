import { useState, useEffect } from 'react';
import Search from './components/Search';
import Card from './components/Card';
import { Loading, Books, CardDiv } from './App.style';
//import cards from './dummyCardData'; //uncomment to load cards without using API

const App = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  //const [cardData, setCardData] = useState<any[]>(cards);  //uncomment to load cards without using API
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  useEffect(() => {
    if (cardData.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [cardData]);

  return (
    <>
      <Search setCardData={setCardData} setIsLoading={setIsLoading} />
      {isLoading && <Loading data-testid="loading">Loading</Loading>}{' '}
      {/* TODO replace this text with an animation */}
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
