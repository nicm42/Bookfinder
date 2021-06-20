import { useState } from 'react';
import App from './App';
import ButtonContext from './contexts/ButtonContext';
import CountContext from './contexts/CountContext';

const Wrapper = () => {
  const [resultStart, setResultStart] = useState<number>(-9);
  const [resultEnd, setResultEnd] = useState<number>(0);

  const [isPreviousResults, setIsPreviousResults] = useState<boolean>(false);
  const [isMoreResults, setIsMoreResults] = useState<boolean>(false);

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
        <App />
      </ButtonContext.Provider>
    </CountContext.Provider>
  );
};

export default Wrapper;
