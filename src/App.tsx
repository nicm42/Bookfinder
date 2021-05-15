import { useState, useEffect } from 'react';
import Search from './components/Search';
import Card from './components/Card';
import { Loading, Books, CardDiv } from './App.style';

const App = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  useEffect(() => {
    if (cardData.length > 0) {
      setIsLoading(false);
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
