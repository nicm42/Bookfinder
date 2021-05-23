import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import App from './App';
import cards, { noCards, manyCards } from './dummyCardData';

describe('App initial tests', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('has a Search component', () => {
    render(<App />);
    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('has a Card component', () => {
    render(<App />);
    const cardDiv = screen.queryAllByTestId('cardDiv');
    expect(cardDiv).toHaveLength(0);
    const card = screen.queryAllByTestId('card');
    expect(card).toHaveLength(0);
  });
});

describe('App tests with card data', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockData = { data: cards };
  const noData = { data: noCards };
  const errorData = {
    response: {
      status: 400,
      statusText: 'Bad API',
    },
    message: '',
    data: noCards,
  };
  const timeOutData = {
    response: {
      status: 400,
      statusText: 'Bad API',
    },
    message: 'timeout of 2ms exceeded',
    data: noCards,
  };

  afterEach(cleanup);

  it('tests when axios works for title', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockData);
    render(<App />);
    const loadingDiv = screen.queryByTestId('Loading');
    expect(loadingDiv).not.toBeInTheDocument();
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
    const resultDiv = screen.queryByTestId('results');
    expect(resultDiv).not.toBeInTheDocument();
    const moreResultsDiv = screen.queryByRole('button', {
      name: /get more results/i,
    });
    expect(moreResultsDiv).not.toBeInTheDocument();

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=0'
      )
    );
    const results = await waitFor(() =>
      screen.getByText('Number of books = 4')
    );
    expect(results).toBeInTheDocument();
    const books = await waitFor(() => screen.getByText('Showing books 1-4'));
    expect(books).toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.queryByRole('button', { name: /get more results/i })
    );
    expect(moreResults).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(4);
    const cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    const cardTitle2 = await waitFor(() => screen.getByText('Title 2'));
    expect(cardTitle1).toBeInTheDocument();
    expect(cardTitle2).toBeInTheDocument();
    const loading = await waitFor(() => screen.queryByTestId('Loading'));
    expect(loading).not.toBeInTheDocument();
    const error = await waitFor(() => screen.queryByTestId('error'));
    expect(error).not.toBeInTheDocument();
  });

  it('tests when axios works for author', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockData);
    render(<App />);

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'inauthor' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=inauthor:%22test%22&startIndex=0'
      )
    );
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(4);
    const cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    const cardTitle2 = await waitFor(() => screen.getByText('Title 2'));
    expect(cardTitle1).toBeInTheDocument();
    expect(cardTitle2).toBeInTheDocument();
  });

  it('tests when axios errors', async () => {
    mockedAxios.get.mockRejectedValueOnce(errorData);
    render(<App />);

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    const results = await waitFor(() =>
      screen.queryByText('Number of books', { exact: false })
    );
    expect(results).not.toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.queryByRole('button', { name: /get more results/i })
    );
    expect(moreResults).not.toBeInTheDocument();
    const books = await waitFor(() =>
      screen.queryByText('Showing books', { exact: false })
    );
    expect(books).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const loading = await waitFor(() => screen.queryByTestId('Loading'));
    expect(loading).not.toBeInTheDocument();
    const error = await waitFor(() =>
      screen.queryByText('Something went wrong :(', { exact: false })
    );
    expect(error).toBeInTheDocument();
  });

  it('tests when axios times out', async () => {
    mockedAxios.get.mockRejectedValueOnce(timeOutData);
    render(<App />);

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    const results = await waitFor(() =>
      screen.queryByText('Number of books', { exact: false })
    );
    expect(results).not.toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.queryByRole('button', { name: /get more results/i })
    );
    expect(moreResults).not.toBeInTheDocument();
    const books = await waitFor(() =>
      screen.queryByText('Showing books', { exact: false })
    );
    expect(books).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const loading = await waitFor(() => screen.queryByTestId('Loading'));
    expect(loading).not.toBeInTheDocument();
    const error = await waitFor(() =>
      screen.queryByText('The request timed out', { exact: false })
    );
    expect(error).toBeInTheDocument();
  });

  it('tests when no data found on title search', async () => {
    mockedAxios.get.mockResolvedValueOnce(noData);
    render(<App />);

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    const results = await waitFor(() =>
      screen.queryByText('Number of books', { exact: false })
    );
    expect(results).not.toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.queryByRole('button', { name: /get more results/i })
    );
    expect(moreResults).not.toBeInTheDocument();
    const books = await waitFor(() =>
      screen.queryByText('Showing books', { exact: false })
    );
    expect(books).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const loading = await waitFor(() => screen.queryByTestId('Loading'));
    expect(loading).not.toBeInTheDocument();
    const error = await waitFor(() =>
      screen.queryByText('No books were found with the title', { exact: false })
    );
    expect(error).toBeInTheDocument();
  });

  it('tests when no data found on author search', async () => {
    mockedAxios.get.mockResolvedValueOnce(noData);
    render(<App />);

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'inauthor' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const error = await waitFor(() =>
      screen.queryByText('No books were found with the author', {
        exact: false,
      })
    );
    expect(error).toBeInTheDocument();
  });
});

describe('App tests with card data with more than 10 cards', () => {
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockData = { data: manyCards };

  afterEach(cleanup);

  it('tests more than 10 cards', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockData);
    render(<App />);

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    const results = await waitFor(() =>
      screen.getByText('Number of books = 14')
    );
    expect(results).toBeInTheDocument();
    const books = await waitFor(() => screen.getByText('Showing books 1-10'));
    expect(books).toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.getByRole('button', { name: /get more results/i })
    );
    expect(moreResults).toBeInTheDocument();
  });
});
