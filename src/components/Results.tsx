import PropTypes from 'prop-types';
import * as Styled from './Results.styles';

interface ResultsProps {
  resultStart: number;
  resultEnd: number;
}

const Results = ({ resultStart, resultEnd }: ResultsProps) => (
  <Styled.ResultsCount>
    Showing books {resultStart}-{resultEnd}
  </Styled.ResultsCount>
);

Results.propTypes = {
  resultStart: PropTypes.number.isRequired,
  resultEnd: PropTypes.number.isRequired,
};

export default Results;
