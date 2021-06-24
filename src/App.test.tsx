import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import ButtonContext from './contexts/ButtonContext';
import CountContext from './contexts/CountContext';
import SearchContext from './contexts/SearchContext';
import App from './App';
import cards, {
  noCards,
  manyCards1,
  manyCards2,
  manyCards3,
} from './dummyCardData';

window.scrollTo = jest.fn();

describe('App initial tests', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('has a header', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
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
    request: {
      status: 400,
    },
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
    let loadingDiv = screen.queryByTestId('loading');
    expect(loadingDiv).not.toBeInTheDocument();
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
    const resultDiv = screen.queryByTestId('results');
    expect(resultDiv).not.toBeInTheDocument();

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    loadingDiv = screen.queryByTestId('loading');
    expect(loadingDiv).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=0&maxResults=10'
      )
    );
    loadingDiv = await waitFor(() => screen.queryByTestId('loading'));
    expect(loadingDiv).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(4);
    const cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    const cardTitle2 = await waitFor(() => screen.getByText('Title 2'));
    expect(cardTitle1).toBeInTheDocument();
    expect(cardTitle2).toBeInTheDocument();
    const loading = await waitFor(() => screen.queryByTestId('loading'));
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
        'https://www.googleapis.com/books/v1/volumes?q=inauthor:%22test%22&startIndex=0&maxResults=10'
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

    const moreResults = await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    );
    expect(moreResults).toHaveLength(0);
    const books = await waitFor(() =>
      screen.queryByText('Showing books', { exact: false })
    );
    expect(books).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const loading = await waitFor(() => screen.queryByTestId('loading'));
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

    const moreResults = await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    );
    expect(moreResults).toHaveLength(0);
    const books = await waitFor(() =>
      screen.queryByText('Showing books', { exact: false })
    );
    expect(books).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const loading = await waitFor(() => screen.queryByTestId('loading'));
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

    const moreResults = await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    );
    expect(moreResults).toHaveLength(0);
    const books = await waitFor(() =>
      screen.queryByText('Showing books', { exact: false })
    );
    expect(books).not.toBeInTheDocument();
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const loading = await waitFor(() => screen.queryByTestId('loading'));
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
  const setSearchText = jest.fn();
  const setSearchType = jest.fn();
  const setIsPreviousResults = jest.fn();
  const setIsMoreResults = jest.fn();
  const setResultStart = jest.fn();
  const setResultEnd = jest.fn();

  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxiosMany1 = axios as jest.Mocked<typeof axios>;
  const mockedAxiosMany2 = axios as jest.Mocked<typeof axios>;
  const mockedAxiosMany3 = axios as jest.Mocked<typeof axios>;
  const mockData = { data: cards };
  const mockDataMany1 = { data: manyCards1 };
  const mockDataMany2 = { data: manyCards2 };
  const mockDataMany3 = { data: manyCards3 };

  afterEach(cleanup);

  it.only('tests more than 10 cards', async () => {
    const searchText = 'test';
    const searchType = 'intitle';
    const isPreviousResults = true;
    const isMoreResults = true;
    const resultStart = 1;
    const resultEnd = 10;
    const resultsPerPage = 10;

    mockedAxiosMany1.get.mockResolvedValue(mockDataMany1);
    mockedAxiosMany2.get.mockResolvedValue(mockDataMany2);
    mockedAxiosMany3.get.mockResolvedValue(mockDataMany3);
    render(
      <CountContext.Provider
        value={{ resultStart, setResultStart, resultEnd, setResultEnd }}
      >
        <ButtonContext.Provider
          value={{
            isPreviousResults,
            setIsPreviousResults,
            isMoreResults,
            setIsMoreResults,
          }}
        >
          <SearchContext.Provider
            value={{ searchText, setSearchText, searchType, setSearchType }}
          >
            <App />
          </SearchContext.Provider>
        </ButtonContext.Provider>
      </CountContext.Provider>
    );

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockedAxiosMany1.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=0&maxResults=10'
      )
    );

    let cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    const next = await waitFor(() =>
      screen.getAllByRole('button', { name: /Next/i })
    );

    fireEvent.click(next[0]);
    await waitFor(() =>
      expect(mockedAxiosMany2.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=9&maxResults=10'
      )
    );
    const cardTitle11 = await waitFor(() => screen.getByText('Title 11'));
    expect(cardTitle11).toBeInTheDocument();
    const previous = await waitFor(() =>
      screen.getAllByRole('button', { name: /Previous/i })
    );

    fireEvent.click(previous[0]);
    cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    expect(cardTitle1).toBeInTheDocument();
  });

  it.only('tests more than 10 cards followed by a new search', async () => {
    let searchText = 'test';
    let searchType = 'intitle';

    mockedAxios.get.mockResolvedValue(mockData);
    render(
      <SearchContext.Provider
        value={{ searchText, setSearchText, searchType, setSearchType }}
      >
        <App />
      </SearchContext.Provider>
    );

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockedAxiosMany1.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=0&maxResults=10'
      )
    );
    let cardTitle = await waitFor(() => screen.getByText('Title 1'));
    expect(cardTitle).toBeInTheDocument();

    searchText = 'test2';
    searchType = 'inauthor';
    fireEvent.change(inputElement, { target: { value: 'test2' } });
    fireEvent.change(dropDown, { target: { value: 'inauthor' } });
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=inauthor:%22test2%22&startIndex=0&maxResults=10'
      )
    );
    cardTitle = await waitFor(() => screen.getByText('Title 1'));
    expect(cardTitle).toBeInTheDocument();
  });
});
