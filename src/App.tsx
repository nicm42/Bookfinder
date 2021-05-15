import { useState, useEffect } from 'react';
import Search from './components/Search';
import Card from './components/Card';
import { Books, CardDiv } from './App.style';
//import cardData from './components/dummyCards';

/* interface cards {
  id: string;
  cover: string;
  title: string;
  author: string;
  publisher: string;
  link: string;
} */

const App = () => {
  /* const [cardData, setCardData] = useState([
    { id: 'id', cover: '', title: '', author: '', publisher: '', link: '' },
  ]);*/
  const [cardData, setCardData] = useState<any[]>([]);
  //const [cardData, setCardData] = useState<null | { id: string }>([]);

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  return (
    <>
      <Search setCardData={setCardData} />
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
