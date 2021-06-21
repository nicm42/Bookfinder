import { useState } from 'react';
import App from './App';
import ButtonContext from './contexts/ButtonContext';
import CountContext from './contexts/CountContext';
import SearchContext from './contexts/SearchContext';

const Wrapper = () => {
  const [resultStart, setResultStart] = useState<number>(-9);
  const [resultEnd, setResultEnd] = useState<number>(0);

  const [isPreviousResults, setIsPreviousResults] = useState<boolean>(false);
  const [isMoreResults, setIsMoreResults] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  return (
    <CountContext.Provider
      value={{ resultStart, setResultStart, resultEnd, setResultEnd }}
    >
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <SearchContext.Provider value={{ searchText, searchType }}>
          <App />
        </SearchContext.Provider>
      </ButtonContext.Provider>
    </CountContext.Provider>
  );
};

export default Wrapper;
