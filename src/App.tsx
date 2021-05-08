import { useState, useEffect } from 'react';
import Search from './components/Search';
import Card from './components/Card';
import { Books } from './App.style';
//import cardData from './components/dummyCards';

const App = () => {
  const [cardData, setCardData] = useState([
    { id: 'id', cover: '', title: '', author: '', publisher: '', link: '' },
  ]);

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  return (
    <>
      <Search setCardData={setCardData} />
      <Books>
        {cardData.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </Books>
    </>
  );
};

export default App;
