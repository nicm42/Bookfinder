import { useContext } from 'react';
import CountContext from '../contexts/CountContext';
import * as Styled from './Results.styles';

const Results = () => {
  const { resultStart, resultEnd } = useContext(CountContext);

  return (
    <Styled.ResultsCount>
      Showing books {resultStart}-{resultEnd}
    </Styled.ResultsCount>
  );
};

export default Results;
