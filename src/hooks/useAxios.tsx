import { useState } from 'react';
import axios from 'axios';

const api = 'https://www.googleapis.com/books/v1/volumes?q=';

const useAxios = () => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getData = async (search: string, type: string, start: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${api}${type}:%22${search}%22&startIndex=${start}&maxResults=10`
      );
      setResults((arr) => [...arr, response.data.items]);
      setCardData(response.data.items);
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getData, cardData, results, errorMessage, isLoading };
};

export default useAxios;
