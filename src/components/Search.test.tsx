import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search tests', () => {
  const getData = jest.fn();

  it('does a dummy test so it collects coverage', () => {
    expect(true).toBeTruthy();
  });

  it('renders without crashing', () => {
    render(<Search getData={getData} />);
  });

  it('has an input element with a label', () => {
    render(<Search getData={getData} />);
    const inputElement = screen.getByRole('searchbox');
    const label = screen.getByText('Search for a book by title or author');
    expect(inputElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('has a submit button with the text: search', () => {
    render(<Search getData={getData} />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('has a select dropdown with options', () => {
    render(<Search getData={getData} />);
    const dropDown = screen.getByTestId('select');
    expect(dropDown).toBeInTheDocument();
    const title = screen.getByRole('option', { name: /title/i });
    expect(title).toBeInTheDocument();
    const author = screen.getByRole('option', { name: /author/i });
    expect(author).toBeInTheDocument();
  });

  it('checks the input and dropdown are blank after submit is clicked', () => {
    render(<Search getData={getData} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');

    const dropDown = screen.getByTestId('select') as HTMLSelectElement;
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    expect(dropDown.value).toBe('intitle');

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    expect(inputElement.value).toBe('');
    expect(dropDown.value).toBe('');
  });
});
