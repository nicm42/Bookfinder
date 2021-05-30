import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Card from './components/Card';
import {
  Header,
  LoadingDiv,
  Loading,
  Error,
  Books,
  ResultsCount,
  ResultsTotal,
  ResultsCurrent,
  PrevNext,
  Previous,
  Next,
} from './App.style';
import { testCards } from './dummyCardData'; //uncomment to load cards without using API

const App = () => {
  //const [cardData, setCardData] = useState<any[]>([]);
  const [cardData, setCardData] = useState<any[]>(testCards); //uncomment to load cards without using API
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  const [resultCount, setResultCount] = useState<number>(0);
  const [isPreviousResults, setIsPreviousResults] = useState<boolean>(false);
  const [isMoreResults, setIsMoreResults] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [resultStart, setResultStart] = useState<number>(-9);
  const [resultEnd, setResultEnd] = useState<number>(0);

  /* Google Books API automatically returns 10 books 
    but since I'm using that 10 all over the place we need a constant
    - and to see maxResults in case they change that default*/
  const resultsPerPage: number = 10;
  let startIndex: number;

  useEffect(() => {
    document.title = 'Book Finder';
  }, []);

  useEffect(() => {
    if (pageNumber === 1) {
      setIsPreviousResults(false);
    }
  }, [pageNumber]);

  const searchAgain = () => {
    setPageNumber((previousValue) => previousValue + 1);
    startIndex = resultStart + resultsPerPage - 2;
    console.log(startIndex);
    getData(searchText, searchType, startIndex);
  };

  const goBack = () => {
    window.scrollTo({ top: 0 }); //scroll back up, otherwise it's not clear anything has changed
    startIndex = resultStart - resultsPerPage - 2;
    console.log(startIndex);
    setCardData(results[pageNumber - 2]);
    setIsMoreResults(true);
    setPageNumber((previousValue) => previousValue - 1);
    setResultStart((previousValue) => previousValue - resultsPerPage);
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

  const getData = async (search: string, type: string, start: number) => {
    //Need to re-set everything if this is a new search
    if (start === 0) {
      setResultStart(1 - resultsPerPage);
      setResultEnd(0);
      setPageNumber(1);
      setIsMoreResults(false);
      setIsPreviousResults(false);
      setResultCount(0);
    } else {
      setIsPreviousResults(true);
    }

    //set these two, so we can use them for another search
    setSearchText(search);
    setSearchType(type);

    setIsLoading(true);
    setCardData([]); //in case this is another search, clear the results from the previous search
    setErrorMessage(''); //in case this is another search, clear the error message

    try {
      const api = 'https://www.googleapis.com/books/v1/volumes?q=';
      const response = await axios.get(
        `${api}${type}:%22${search}%22&startIndex=${start}&maxResults=10`
      );

      //Uncomment line below to test API errors
      //const response = await axios.get(`http://httpstat.us/404`);
      //Uncomment lines below to test API timeout
      /* const response = await axios.get(`http://httpstat.us/504`, {
        timeout: 2,
      }); */

      if (response.data.totalItems === 0) {
        if (type === 'intitle') {
          setErrorMessage(`No books were found with the title ${search} :(`);
        }
        if (type === 'inauthor') {
          setErrorMessage(`No books were found with the author ${search} :(`);
        }
      } else {
        //There is data!
        setCardData(response.data.items);
        setResultCount(response.data.totalItems);
        setResultStart((previousValue) => previousValue + resultsPerPage);
        //Save these results so we can use them later if we need to go back to them
        setResults((arr) => [...arr, response.data.items]);
        if (response.data.totalItems > resultsPerPage) {
          //Save these results so we can use them later if we need to go back to them
          if (resultEnd + resultsPerPage < response.data.totalItems) {
            setResultEnd((previousValue) => previousValue + resultsPerPage);
            setIsMoreResults(true);
          } else {
            setResultEnd(response.data.totalItems);
            setIsMoreResults(false);
          }
        } else {
          setIsMoreResults(false);
          setResultEnd(response.data.totalItems);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'timeout of 2ms exceeded') {
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

  return (
    <>
      <Header>Book Search</Header>
      <Search getData={getData} />
      {errorMessage && <Error data-testid="error">{errorMessage}</Error>}
      {resultCount > 0 && (
        <ResultsCount data-testid="results">
          <ResultsTotal>Number of books = {resultCount}</ResultsTotal>
          <ResultsCurrent>
            Showing books {resultStart}-{resultEnd}
          </ResultsCurrent>
        </ResultsCount>
      )}
      {!isLoading && (
        <PrevNext>
          {isPreviousResults && <Previous onClick={goBack}>Previous</Previous>}
          {isMoreResults && <Next onClick={searchAgain}>Next</Next>}
        </PrevNext>
      )}
      {isLoading && (
        <LoadingDiv>
          <Loading data-testid="loading" />
        </LoadingDiv>
      )}
      <Books>
        {cardData &&
          cardData.map((card) => (
            <Card card={card} key={card.id} data-testid="card" />
          ))}
      </Books>
      {!isLoading && (
        <PrevNext>
          {isPreviousResults && <Previous onClick={goBack}>Previous</Previous>}
          {isMoreResults && <Next onClick={searchAgain}>Next</Next>}
        </PrevNext>
      )}
    </>
  );
};

export default App;
