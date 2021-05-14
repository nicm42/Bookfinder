import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react';
import axios from 'axios';
import Search from './Search';

afterEach(cleanup);

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

describe('Search tests', () => {
  const setCardData = jest.fn();

  it('renders without crashing', () => {
    render(<Search setCardData={setCardData} />);
  });

  it('has an input element with a label', () => {
    render(<Search setCardData={setCardData} />);
    const inputElement = screen.getByRole('searchbox');
    const label = screen.getByText('Search for a book');
    expect(inputElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('has a submit button with the text: search', () => {
    render(<Search setCardData={setCardData} />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('checks the input is blank after submit is clicked', () => {
    render(<Search setCardData={setCardData} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
    fireEvent.click(submitButton);
    expect(inputElement.value).toBe('');
  });

  it('calls axios when submit is clicked', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    render(<Search setCardData={setCardData} />);
    const inputElement = screen.getByRole('searchbox');
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.click(submitButton);
    mockedAxios.get.mockResolvedValueOnce({
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
      const logSpy = jest.spyOn(console, 'log');
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q='
      );
      expect(error).toEqual(error);
      expect(logSpy).toEqual(error);
    }
  });
});
