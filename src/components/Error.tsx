import PropTypes from 'prop-types';
import * as Styled from './Error.styles';

interface ErrorProps {
  errorMessage: string;
}

const Error = ({ errorMessage }: ErrorProps) => (
  <Styled.Error data-testid="error">{errorMessage}</Styled.Error>
);

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default Error;
