import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('Search tests', () => {
  it('renders without crashing', () => {
    render(<Search />);
  });

  it('has an input element', () => {
    render(<Search />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('has a submit button with the text: search', () => {
    render(<Search />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });
});
