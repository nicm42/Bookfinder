import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Search from './Search';

afterEach(cleanup);

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

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

  it('calls axios when submit is clicked', async () => {
    render(<Search />);
    const inputElement = screen.getByRole('searchbox');
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(inputElement, { target: { value: 'test' } });
    userEvent.click(submitButton);
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: { greeting: 'hello world' },
    });
    try {
      await whenStable;
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=test'
      );
    } catch (error) {
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q='
      );
      expect(error).toEqual(error);
    }
  });
});
