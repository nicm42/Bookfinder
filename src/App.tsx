import { useState, useEffect, useRef, useContext } from 'react';
import Search from './components/Search';
import Loading from './components/Loading';
import Error from './components/Error';
import Results from './components/Results';
import NavButtons from './components/NavButtons';
import Card from './components/Card';
import useAxios from './hooks/useAxios';
import CountContext from './contexts/CountContext';
import ButtonContext from './contexts/ButtonContext';
import * as Styled from './App.styles';
//import { testCards } from './dummyCardData'; //uncomment to load cards without using API

/* const searchTerm: string = '';
const typeNew: string = '';
const page: number = 0; */

const App = () => {
  const { getData, cardData, results, isLoading, errorMessage } = useAxios();
  const { resultEnd } = useContext(CountContext);
  const { isPreviousResults, isMoreResults } = useContext(ButtonContext);

  /* const [cardData, setCardData] = useState<any[]>([]); */
  //const [cardData, setCardData] = useState<any[]>(testCards); //uncomment to load cards without using API
  /* const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(''); */

  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  const [showButtons, setShowButtons] = useState<boolean>(false);
  //const [isPreviousResults, setIsPreviousResults] = useState<boolean>(false);
  //const [isMoreResults, setIsMoreResults] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  /* const [resultStart, setResultStart] = useState<number>(-9);
  const [resultEnd, setResultEnd] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0); */

  const didMountRef = useRef<boolean>(false);

  /* Google Books API automatically returns 10 books 
    but since I'm using that 10 all over the place we need a constant
    - and to see maxResults in case they change that default*/
  const resultsPerPage: number = 10;
  let startIndex: number;

  /* useEffect(() => {
    if (didMountRef.current) {
      if (pageNumber === 1) {
        setIsPreviousResults(false);
      } else {
        setIsPreviousResults(true);
      }
    } else {
      didMountRef.current = true;
    }
  }, [pageNumber]); */

  //Set whether to show buttons based on whether one of them is not disabled
  //ie there's more than 10 results
  useEffect(() => {
    if (isPreviousResults || isMoreResults) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [isPreviousResults, isMoreResults]);

  return (
    <>
      <header>
        <Styled.Header>Book Search</Styled.Header>
      </header>

      <main>
        <Search getData={getData} />
        {errorMessage && <Error errorMessage={errorMessage} />}
        {resultEnd > 0 && <Results />}
        {showButtons && <NavButtons />}
        {isLoading && <Loading />}
        <Styled.Books>
          {cardData &&
            cardData.map((card) => (
              <Card card={card} key={card.id} data-testid="card" />
            ))}
        </Styled.Books>
        {showButtons && <NavButtons />}
      </main>
    </>
  );
};

export default App;
