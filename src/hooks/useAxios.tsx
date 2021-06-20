import { useState, useContext } from 'react';
import axios from 'axios';
import CountContext from '../contexts/CountContext';
import ButtonContext from '../contexts/ButtonContext';

const api = 'https://www.googleapis.com/books/v1/volumes?q=';

/* Google Books API automatically returns 10 books 
  but since I'm using that 10 all over the place we need a constant
  - and to see maxResults in case they change that default */
const resultsPerPage: number = 10;

const useAxios = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { resultStart, setResultStart, resultEnd, setResultEnd } = useContext(
    CountContext
  );
  const {
    isPreviousResults,
    setIsPreviousResults,
    isMoreResults,
    setIsMoreResults,
  } = useContext(ButtonContext);

  const getData = async (search: string, type: string, start: number) => {
    //Need to re-set everything if this is a new search
    if (start === 0) {
      setResults([]);
      setErrorMessage('');
      setIsPreviousResults(false);
      setIsMoreResults(false);
    } else {
      setIsPreviousResults(true);
    }

    //Re-set these for the next or new search
    setIsLoading(true);
    setCardData([]);

    try {
      const response = await axios.get(
        `${api}${type}:%22${search}%22&startIndex=${start}&maxResults=10`
      );

      //Uncomment line below to test API errors
      /* const response = await axios.get(`http://httpstat.us/404`); */
      //Uncomment one of the lines below to test API timeout
      /* const response = await axios.get(`http://httpstat.us/504`, {
        timeout: 2,*/
      /* const response = await axios.get(`http://httpstat.us/408`); */

      if (!response.data.items) {
        if (type === 'intitle') {
          setErrorMessage(`No books were found with the title ${search} :(`);
        }
        if (type === 'inauthor') {
          setErrorMessage(`No books were found with the author ${search} :(`);
        }
      } else {
        //There is data!
        setResults((arr) => [...arr, response.data.items]);
        setCardData(response.data.items);

        setResultStart((previousValue: any) => previousValue + resultsPerPage);
        setResultEnd(
          (previousValue: any) => previousValue + response.data.items.length
        );

        if (response.data.totalItems > resultsPerPage) {
          if (start + 1 + resultsPerPage < response.data.totalItems) {
            setIsMoreResults(true);
          } else {
            setIsMoreResults(false);
          }
        } else {
          setIsMoreResults(false);
        }
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
        console.log('something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getData,
    cardData,
    results,
    isLoading,
    errorMessage,
    resultStart,
    resultEnd,
    isPreviousResults,
    isMoreResults,
  };
};

export default useAxios;
