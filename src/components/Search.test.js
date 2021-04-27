import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search tests', () => {
  it('renders without crashing', () => {
    render(<Search />);
  });

  it('has an input element with a label', () => {
    render(<Search />);
    const inputElement = screen.getByRole('searchbox');
    const label = screen.getByText('Search for a book');
    expect(inputElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('has a submit button with the text: search', () => {
    render(<Search />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });

  /* it('picks up text from input box when submit is clicked', () => {
    render(<Search />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);
    //expect(submitButton).toBeInTheDocument();
  }); */
});
