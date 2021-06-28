import { useState, useEffect, useContext } from 'react';
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

const App = () => {
  const {
    getData,
    cardData,
    setCardData,
    results,
    isLoading,
    errorMessage,
    totalItems,
    resultsPerPage,
  } = useAxios();
  const { resultEnd } = useContext(CountContext);
  const { isPreviousResults, isMoreResults } = useContext(ButtonContext);

  const [showButtons, setShowButtons] = useState<boolean>(false);

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
        {showButtons && (
          <NavButtons
            getData={getData}
            resultsPerPage={resultsPerPage}
            results={results}
            setCardData={setCardData}
            totalItems={totalItems}
          />
        )}
        {isLoading && <Loading />}
        <Styled.Books>
          {cardData &&
            cardData.map((card) => (
              <Card card={card} key={card.id} data-testid="card" />
            ))}
        </Styled.Books>
        {showButtons && (
          <NavButtons
            getData={getData}
            resultsPerPage={resultsPerPage}
            results={results}
            setCardData={setCardData}
            totalItems={totalItems}
          />
        )}
      </main>
    </>
  );
};

export default App;
