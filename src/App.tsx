import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Loading from './components/Loading';
import Error from './components/Error';
import Results from './components/Results';
import NavButtons from './components/NavButtons';
import Card from './components/Card';
//import DataContext from './contexts/DataContext';
import ButtonContext from './contexts/ButtonContext';
import * as Styled from './App.styles';
//import { testCards } from './dummyCardData'; //uncomment to load cards without using API

const App = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  //const [cardData, setCardData] = useState<any[]>(testCards); //uncomment to load cards without using API
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [isPreviousResults, setIsPreviousResults] = useState<boolean>(false);
  const [isMoreResults, setIsMoreResults] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [resultStart, setResultStart] = useState<number>(-9);
  const [resultEnd, setResultEnd] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const didMountRef = useRef<boolean>(false);

  /* Google Books API automatically returns 10 books 
    but since I'm using that 10 all over the place we need a constant
    - and to see maxResults in case they change that default*/
  const resultsPerPage: number = 10;
  let startIndex: number;

  useEffect(() => {
    if (didMountRef.current) {
      if (pageNumber === 1) {
        setIsPreviousResults(false);
      } else {
        setIsPreviousResults(true);
      }
    } else {
      didMountRef.current = true;
    }
  }, [pageNumber]);

  const getData = async (search: string, type: string, start: number) => {
    //Need to re-set everything if this is a new search
    if (start === 0) {
      setResultStart(1 - resultsPerPage);
      setResultEnd(0);
      setPageNumber(1);
      setIsMoreResults(false);
      setIsPreviousResults(false);
      setTotalItems(0);
      setResults([]);
      //set these two, so we can use them for another search
      setSearchText(search);
      setSearchType(type);
    } else {
      setIsPreviousResults(true);
    }

    setShowButtons(false);
    setIsLoading(true);
    //clear these, ready for a new search
    setCardData([]);
    setErrorMessage('');

    try {
      const api = 'https://www.googleapis.com/books/v1/volumes?q=';
      const response = await axios.get(
        `${api}${type}:%22${search}%22&startIndex=${start}&maxResults=10`
      );

      //Uncomment line below to test API errors
      //const response = await axios.get(`http://httpstat.us/404`);
      //Uncomment one of the lines below to test API timeout
      /* const response = await axios.get(`http://httpstat.us/504`, {
        timeout: 2,*/
      /* const response = await axios.get(`http://httpstat.us/408`); */

      setTotalItems(response.data.totalItems);

      if (!response.data.items) {
        if (type === 'intitle') {
          setErrorMessage(`No books were found with the title ${search} :(`);
        }
        if (type === 'inauthor') {
          setErrorMessage(`No books were found with the author ${search} :(`);
        }
      } else {
        //There is data!
        setCardData(response.data.items);
        //setResultCount(response.data.totalItems);
        //console.log(response.data.totalItems);
        setResultStart((previousValue) => previousValue + resultsPerPage);
        //Save these results so we can use them later if we need to go back to them
        setResults((arr) => [...arr, response.data.items]);
        if (response.data.totalItems > resultsPerPage) {
          setShowButtons(true);
          //Save these results so we can use them later if we need to go back to them
          if (start + 1 + resultsPerPage < response.data.totalItems) {
            setIsMoreResults(true);
          } else {
            setIsMoreResults(false);
          }
        } else {
          setIsMoreResults(false);
        }
        setResultEnd(
          (previousValue) => previousValue + response.data.items.length
        );
      }
    } catch (error) {
      console.log(error);
      if (
        error.message.replace(/ .*/, '') === 'timeout' ||
        error.request.status === 408 ||
        error.request.status === 504
      ) {
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

  const searchAgain = () => {
    //If we already have this data, then just show that
    startIndex = resultStart + resultsPerPage - 2;
    if (results.length >= pageNumber + 1) {
      window.scrollTo({ top: 0 }); //scroll back up, otherwise it's not clear anything has changed
      setCardData(results[pageNumber]);
      if (resultEnd + resultsPerPage > totalItems) {
        setIsMoreResults(false);
      }
      setResultStart((previousValue) => previousValue + resultsPerPage);
      setResultEnd(
        (previousValue) => previousValue + results[pageNumber].length
      );
    }
    setPageNumber((previousValue) => previousValue + 1);
    //Otherwise get it from the API
    if (results.length < pageNumber + 1) {
      getData(searchText, searchType, startIndex);
    }
  };

  const goBack = () => {
    window.scrollTo({ top: 0 }); //scroll back up, otherwise it's not clear anything has changed
    startIndex = resultStart - resultsPerPage - 2;
    setCardData(results[pageNumber - 2]);
    setIsMoreResults(true);
    setPageNumber((previousValue) => previousValue - 1);
    setResultStart((previousValue) => previousValue - resultsPerPage);
    /* setResultEnd(
      (previousValue) => previousValue - results[pageNumber - 2].length
    ); */
    //Take the last set of results and round it down to the nearest 10
    //But if it's 10, 20, 30 etc then just need to take 10 off it
    if (resultEnd % 10 === 0) {
      setResultEnd((previousValue) => previousValue - resultsPerPage);
    } else {
      setResultEnd(
        (previousValue) =>
          Math.floor(previousValue / resultsPerPage) * resultsPerPage
      );
    }
  };

  return (
    <>
      <header>
        <Styled.Header>Book Search</Styled.Header>
      </header>

      <main>
        <Search getData={getData} />
        {errorMessage && <Error errorMessage={errorMessage} />}
        {resultEnd > 0 && (
          <Results resultStart={resultStart} resultEnd={resultEnd} />
        )}
        {showButtons && (
          <ButtonContext.Provider value={{ isPreviousResults, isMoreResults }}>
            <NavButtons goBack={goBack} searchAgain={searchAgain} />
          </ButtonContext.Provider>
        )}
        {isLoading && <Loading />}
        <Styled.Books>
          {cardData &&
            cardData.map((card) => (
              <Card card={card} key={card.id} data-testid="card" />
            ))}
        </Styled.Books>
        {showButtons && (
          <ButtonContext.Provider value={{ isPreviousResults, isMoreResults }}>
            <NavButtons goBack={goBack} searchAgain={searchAgain} />
          </ButtonContext.Provider>
        )}
      </main>
    </>
  );
};

export default App;
