import { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import CountContext from '../contexts/CountContext';
import SearchContext from '../contexts/SearchContext';
import * as Styled from './NavButtons.styles';

interface NavButtonProps {
  getData: Function;
  resultsPerPage: number;
  results: [][];
  setCardData: (c: []) => void;
  totalItems: number;
}

const NavButtons = ({
  getData,
  resultsPerPage,
  results,
  setCardData,
  totalItems,
}: NavButtonProps) => {
  const {
    isPreviousResults,
    setIsPreviousResults,
    isMoreResults,
    setIsMoreResults,
  } = useContext(ButtonContext);
  const { resultStart, setResultStart, resultEnd, setResultEnd } = useContext(
    CountContext
  );
  const { searchText, searchType } = useContext(SearchContext);

  const searchAgain = () => {
    //If we already have this data, then just show that
    const startIndex = resultStart + resultsPerPage - 2;
    const pageNumber = (resultStart + resultsPerPage - 1) / resultsPerPage;
    if (results.length >= pageNumber + 1) {
      window.scrollTo({ top: 0 }); //scroll back up, otherwise it's not clear anything has changed
      setCardData(results[pageNumber]);
      setIsPreviousResults(true);
      if (resultEnd + resultsPerPage > totalItems) {
        setIsMoreResults(false);
      }
      setResultStart((previousValue: number) => previousValue + resultsPerPage);
      setResultEnd(
        (previousValue: number) => previousValue + results[pageNumber].length
      );
    }
    //Otherwise get it from the API
    if (results.length < pageNumber + 1) {
      getData(searchText, searchType, startIndex);
    }
  };

  const goBack = () => {
    window.scrollTo({ top: 0 }); //scroll back up, otherwise it's not clear anything has changed
    const pageNumber = (resultStart + resultsPerPage - 1) / resultsPerPage;
    setCardData(results[pageNumber - 2]);
    setIsMoreResults(true);
    if (resultStart - resultsPerPage === 1) {
      setIsPreviousResults(false);
    }
    setResultStart((previousValue: number) => previousValue - resultsPerPage);
    //Take the last set of results and round it down to the nearest 10
    //But if it's 10, 20, 30 etc then just need to take 10 off it
    if (resultEnd % 10 === 0) {
      setResultEnd((previousValue: number) => previousValue - resultsPerPage);
    } else {
      setResultEnd(
        (previousValue: number) =>
          Math.floor(previousValue / resultsPerPage) * resultsPerPage
      );
    }
  };

  return (
    <Styled.PrevNext>
      <Styled.Previous
        disabled={!isPreviousResults}
        onClick={goBack}
        isPreviousResults={isPreviousResults}
      >
        Previous
      </Styled.Previous>

      <Styled.Next
        disabled={!isMoreResults}
        onClick={searchAgain}
        isMoreResults={isMoreResults}
      >
        Next
      </Styled.Next>
    </Styled.PrevNext>
  );
};

export default NavButtons;
