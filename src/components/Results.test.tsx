import { render, screen } from '@testing-library/react';
import Results from './Results';

describe('renders without crashing', () => {
  it('shows the error message if it has text', () => {
    render(<Results resultStart={1} resultEnd={10} />);
    const books = screen.getByText('Showing books 1-10');
    expect(books).toBeInTheDocument();
  });
});
