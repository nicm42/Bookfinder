import { render, screen } from '@testing-library/react';
import CountContext from '../contexts/CountContext';
import Results from './Results';

describe('renders without crashing', () => {
  const resultStart = 1;
  const resultEnd = 10;
  const setResultStart = jest.fn();
  const setResultEnd = jest.fn();

  it('shows the error message if it has text', () => {
    render(
      <CountContext.Provider
        value={{
          resultStart,
          setResultStart,
          resultEnd,
          setResultEnd,
        }}
      >
        <Results />
      </CountContext.Provider>
    );
    const books = screen.getByText('Showing books 1-10');
    expect(books).toBeInTheDocument();
  });
});
