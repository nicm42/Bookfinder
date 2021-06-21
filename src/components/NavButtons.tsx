import { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import CountContext from '../contexts/CountContext';
import SearchContext from '../contexts/SearchContext';
import * as Styled from './NavButtons.styles';

interface NavButtonProps {
  getData: Function;
  resultsPerPage: number;
  results: [][];
  pageNumber: number;
  setPageNumber: (previousValue: any) => void;
  setCardData: (c: []) => void;
  totalItems: number;
}

const NavButtons = ({
  getData,
  resultsPerPage,
  results,
  pageNumber,
  setPageNumber,
  setCardData,
  totalItems,
}: NavButtonProps) => {
  const { isPreviousResults, isMoreResults, setIsMoreResults } = useContext(
    ButtonContext
  );
  const { resultStart, setResultStart, resultEnd, setResultEnd } = useContext(
    CountContext
  );
  const { searchText, searchType } = useContext(SearchContext);

  const searchAgain = () => {
    //If we already have this data, then just show that
    const startIndex = resultStart + resultsPerPage - 2;
    console.log(results.length, pageNumber);
    if (results.length >= pageNumber + 1) {
      console.log('not getting data');
      window.scrollTo({ top: 0 }); //scroll back up, otherwise it's not clear anything has changed
      setCardData(results[pageNumber]);
      if (resultEnd + resultsPerPage > totalItems) {
        setIsMoreResults(false);
      }
      setResultStart((previousValue: any) => previousValue + resultsPerPage);
      setResultEnd(
        (previousValue: any) => previousValue + results[pageNumber].length
      );
    }
    setPageNumber((previousValue: any) => previousValue + 1);
    //Otherwise get it from the API
    if (results.length < pageNumber + 1) {
      console.log('getting data');
      getData(searchText, searchType, startIndex);
    }
  };

  return (
    <Styled.PrevNext>
      <Styled.Previous
        disabled={!isPreviousResults}
        /* onClick={goBack} */
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
