import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('renders without crashing', () => {
  it('shows the error message if it has text', () => {
    render(<Error errorMessage="This is an error message" />);
    const errorDiv = screen.getByTestId('error');
    expect(errorDiv).toBeInTheDocument();
  });
});
