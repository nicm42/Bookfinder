import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
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
    const moreResultsDiv = screen.queryByRole('button', {
      name: /Next/i,
    });
    expect(moreResultsDiv).not.toBeInTheDocument();

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
    const books = await waitFor(() => screen.getByText('Showing books 1-4'));
    expect(books).toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    );
    expect(moreResults).toHaveLength(0);
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

  it('tests more than 10 cards', async () => {
    mockedAxiosMany1.get.mockResolvedValueOnce(mockDataMany1);
    mockedAxiosMany2.get.mockResolvedValueOnce(mockDataMany2);
    mockedAxiosMany3.get.mockResolvedValueOnce(mockDataMany3);
    render(<App />);

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

    let books = await waitFor(() => screen.getByText('Showing books 1-10'));
    expect(books).toBeInTheDocument();
    let cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    expect(cardTitle1).toBeInTheDocument();
    let previous = await waitFor(() =>
      screen.queryAllByRole('button', { name: /Previous/i })
    );
    expect(previous[0]).toBeDisabled();
    expect(previous[1]).toBeDisabled();
    let next = await waitFor(() =>
      screen.getAllByRole('button', { name: /Next/i })
    );
    expect(next[0]).not.toBeDisabled();
    expect(next[1]).not.toBeDisabled();

    fireEvent.click(next[0]);
    await waitFor(() =>
      expect(mockedAxiosMany2.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=9&maxResults=10'
      )
    );
    books = await waitFor(() => screen.getByText('Showing books 11-20'));
    expect(books).toBeInTheDocument();
    let cardTitle11 = await waitFor(() => screen.getByText('Title 11'));
    expect(cardTitle11).toBeInTheDocument();
    previous = await waitFor(() =>
      screen.getAllByRole('button', { name: /Previous/i })
    );
    expect(previous[0]).not.toBeDisabled();
    expect(previous[1]).not.toBeDisabled();
    next = (await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    )) as HTMLElement[];
    expect(next[0]).not.toBeDisabled();
    expect(next[1]).not.toBeDisabled();

    fireEvent.click(next[0]);
    await waitFor(() =>
      expect(mockedAxiosMany3.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=19&maxResults=10'
      )
    );
    books = await waitFor(() => screen.getByText('Showing books 21-24'));
    expect(books).toBeInTheDocument();
    let cardTitle21 = await waitFor(() => screen.getByText('Title 21'));
    expect(cardTitle21).toBeInTheDocument();
    previous = await waitFor(() =>
      screen.getAllByRole('button', { name: /Previous/i })
    );
    expect(previous[0]).not.toBeDisabled();
    expect(previous[1]).not.toBeDisabled();
    next = (await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    )) as HTMLElement[];
    expect(next[0]).toBeDisabled();
    expect(next[1]).toBeDisabled();

    fireEvent.click(previous[0]);
    books = await waitFor(() => screen.getByText('Showing books 11-20'));
    cardTitle1 = await waitFor(() => screen.getByText('Title 11'));
    expect(cardTitle1).toBeInTheDocument();
    expect(books).toBeInTheDocument();
    previous = await waitFor(() =>
      screen.getAllByRole('button', { name: /Previous/i })
    );
    expect(previous[0]).not.toBeDisabled();
    expect(previous[1]).not.toBeDisabled();
    next = await waitFor(() =>
      screen.getAllByRole('button', { name: /Next/i })
    );
    expect(next[0]).not.toBeDisabled();
    expect(next[1]).not.toBeDisabled();

    fireEvent.click(previous[0]);
    books = await waitFor(() => screen.getByText('Showing books 1-10'));
    cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    expect(cardTitle1).toBeInTheDocument();
    expect(books).toBeInTheDocument();
    previous = await waitFor(() =>
      screen.queryAllByRole('button', { name: /Previous/i })
    );
    expect(previous[0]).toBeDisabled();
    expect(previous[1]).toBeDisabled();
    next = await waitFor(() =>
      screen.getAllByRole('button', { name: /Next/i })
    );
    expect(next[0]).not.toBeDisabled();
    expect(next[1]).not.toBeDisabled();

    fireEvent.click(next[0]);
    books = await waitFor(() => screen.getByText('Showing books 11-20'));
    expect(books).toBeInTheDocument();
    cardTitle11 = await waitFor(() => screen.getByText('Title 11'));
    expect(cardTitle11).toBeInTheDocument();

    fireEvent.click(next[0]);
    books = await waitFor(() => screen.getByText('Showing books 21-24'));
    expect(books).toBeInTheDocument();
    cardTitle21 = await waitFor(() => screen.getByText('Title 21'));
    expect(cardTitle21).toBeInTheDocument();
    previous = await waitFor(() =>
      screen.getAllByRole('button', { name: /Previous/i })
    );
    expect(previous[0]).not.toBeDisabled();
    expect(previous[1]).not.toBeDisabled();
    next = (await waitFor(() =>
      screen.queryAllByRole('button', { name: /Next/i })
    )) as HTMLElement[];
    expect(next[0]).toBeDisabled();
    expect(next[1]).toBeDisabled();
  });

  it('tests more than 10 cards followed by a new search', async () => {
    mockedAxiosMany1.get.mockResolvedValueOnce(mockDataMany1);
    mockedAxiosMany2.get.mockResolvedValueOnce(mockDataMany2);
    mockedAxios.get.mockResolvedValueOnce(mockData);
    render(<App />);

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
    let books = await waitFor(() => screen.getByText('Showing books 1-10'));
    expect(books).toBeInTheDocument();
    const moreResults = await waitFor(() =>
      screen.getAllByRole('button', { name: /Next/i })
    );

    fireEvent.click(moreResults[0]);
    await waitFor(() =>
      expect(mockedAxiosMany2.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=9&maxResults=10'
      )
    );
    books = await waitFor(() => screen.getByText('Showing books 11-20'));
    expect(books).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    fireEvent.click(submitButton);
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22&startIndex=0&maxResults=10'
      )
    );
    books = await waitFor(() => screen.getByText('Showing books 1-4'));
    expect(books).toBeInTheDocument();
  });
});
