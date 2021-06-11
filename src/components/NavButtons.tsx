import PropTypes from 'prop-types';
import * as Styled from './NavButtons.styles';

interface NavButtonProps {
  isPreviousResults: boolean;
  isMoreResults: boolean;
  goBack: () => void;
  searchAgain: () => void;
}

const NavButtons = ({
  isPreviousResults,
  isMoreResults,
  goBack,
  searchAgain,
}: NavButtonProps) => (
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

NavButtons.propTypes = {
  isPreviousResults: PropTypes.bool.isRequired,
  isMoreResults: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  searchAgain: PropTypes.func.isRequired,
};

export default NavButtons;
