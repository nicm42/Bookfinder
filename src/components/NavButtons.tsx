import { useContext } from 'react';
import PropTypes from 'prop-types';
import ButtonContext from '../contexts/ButtonContext';
import * as Styled from './NavButtons.styles';

interface NavButtonProps {
  goBack: () => void;
  searchAgain: () => void;
}

const NavButtons = ({ goBack, searchAgain }: NavButtonProps) => {
  const { isPreviousResults, isMoreResults } = useContext(ButtonContext);

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

NavButtons.propTypes = {
  goBack: PropTypes.func.isRequired,
  searchAgain: PropTypes.func.isRequired,
};

export default NavButtons;
