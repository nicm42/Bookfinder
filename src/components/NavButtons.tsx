import * as Styled from '../App.style';

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

export default NavButtons;
