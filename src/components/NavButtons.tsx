import { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import * as Styled from './NavButtons.styles';

const NavButtons = () => {
  const { isPreviousResults, isMoreResults } = useContext(ButtonContext);

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
        /* onClick={searchAgain} */
        isMoreResults={isMoreResults}
      >
        Next
      </Styled.Next>
    </Styled.PrevNext>
  );
};

export default NavButtons;
