import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import App from './App';
import cards, { noCards } from './dummyCardData';

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
  const errorData = {
    response: {
      status: 400,
      statusText: 'Bad API',
    },
    data: noCards,
  };

  afterEach(cleanup);

  it('tests when axios works', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockData);
    render(<App />);
    const loading = screen.queryByTestId('Loading');
    expect(loading).not.toBeInTheDocument();
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    //expect(loading).toBeInTheDocument();  //TODO how to test this

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22'
      )
    );
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(3);
    const cardTitle1 = await waitFor(() => screen.getByText('Title 1'));
    const cardTitle2 = await waitFor(() => screen.getByText('Title 2'));
    expect(cardTitle1).toBeInTheDocument();
    expect(cardTitle2).toBeInTheDocument();
  });

  it('tests when axios errors', async () => {
    mockedAxios.get.mockRejectedValueOnce(errorData);
    render(<App />);
    const loading = screen.queryByTestId('Loading');
    expect(loading).not.toBeInTheDocument();
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();

    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    //expect(loading).toBeInTheDocument();  //TODO how to test this

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22'
      )
    );
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(0);
    const error = await waitFor(() =>
      screen.queryByText('Something went wrong :(', { exact: false })
    );
    expect(error).toBeInTheDocument();
  });
});
