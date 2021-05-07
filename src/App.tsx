import { useEffect } from 'react';
import Search from './components/Search';
import Card from './components/Card';
import { Books } from './App.style';
import cardData from './components/dummyCards';

const App = () => {
  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  return (
    <>
      <Search />
      <Books>
        {cardData.map((card) => (
          <Card card={card} key={card.id} data-testid="card" />
        ))}
      </Books>
    </>
  );
};

export default App;
