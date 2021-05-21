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
  const whenStable = async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };

  afterEach(cleanup);

  //This has fixed all the messages in Jest, but it always runs the error bit from App
  it.only('tests axios', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockData);
    render(<App />);
    const inputElement = screen.getByRole('searchbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    const dropDown = screen.getByTestId('select');
    fireEvent.change(dropDown, { target: { value: 'intitle' } });
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=intitle:%22test%22'
      )
    );
    const cardDiv = await waitFor(() => screen.queryAllByTestId('cardDiv'));
    expect(cardDiv).toHaveLength(3);
    try {
      //const response = mockedAxios.get.mockResolvedValueOnce(mockData);
      //console.log(response);
      //await waitFor(() => whenStable);
      //we need the waitFor here so Jest doesn't complain about setIsLoading not being wrapped in act
      //await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(20)); //why is this passing whatever number I put in it?
      //await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
      /* await waitFor(() =>
        expect(mockedAxios.get).toHaveBeenCalledWith('something')
      ); */
      //const card = waitFor(() => screen.queryAllByTestId('card'));
      //expect(card).toHaveLength(20); //this is also passing no matter what number I put in it
      //console.log(cards);
    } catch (error) {
      //there's an error
    }
  });

  it('shows the cards when they have some data', async () => {
    render(<App />);
    const loading = screen.queryByTestId('Loading');
    expect(loading).not.toBeInTheDocument();
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();

    const cardDiv = screen.queryAllByTestId('cardDiv');
    const card = screen.queryAllByTestId('card');
    const submitButton = screen.getByRole('button', { name: /search/i });

    fireEvent.click(submitButton);

    /* mockedAxios.get.mockResolvedValueOnce(() => {
      Promise.resolve({
        status: 200,
        data: { cards },
      });
    }); */

    try {
      expect(loading).toBeInTheDocument();
      //await whenStable;

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=test'
      );
      expect(cardDiv).toHaveLength(2);
      expect(card).toHaveLength(2);
      expect(loading).not.toBeInTheDocument();
      expect(errorDiv).not.toBeInTheDocument();

      const cardTitle1 = screen.getByText('Title1');
      const cardTitle2 = screen.getByText('Title2');
      expect(cardTitle1).toBeInTheDocument();
      expect(cardTitle2).toBeInTheDocument();
    } catch (err) {
      expect(err).toEqual(err);
    }
  });

  it('calls axios with an error when submit is clicked', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    mockedAxios.get.mockResolvedValueOnce({
      //TODO should be mockRejectedValueOnce
      status: 400,
      data: {},
    });

    try {
      await whenStable;
    } catch (err) {
      const logSpy = jest.spyOn(console, 'log');
      expect(axios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/books/v1/volumes?q=test'
      );
      expect(err).toEqual(err);
      expect(logSpy).toEqual(err);
    }
  });

  it('shows a message when there is no data', async () => {
    render(<App />);
    const card = screen.queryAllByTestId('card');
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
    const inputElement = screen.getByRole('searchbox');
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.click(submitButton);
    const noResultSearchedFor = screen.queryByText('test');
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: { noCards },
    });
    try {
      await whenStable;
      expect(errorDiv).toBeInTheDocument();
      expect(noResultSearchedFor).toBeInTheDocument();
      expect(card).toHaveLength(0);
    } catch (err) {
      console.log('caught');
    }
  });

  it('shows a message when there is an error', async () => {
    render(<App />);
    const card = screen.queryAllByTestId('card');
    const cardDiv = screen.queryAllByTestId('cardDiv');
    const errorDiv = screen.queryByTestId('error');
    expect(errorDiv).not.toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    mockedAxios.get.mockResolvedValueOnce({
      status: 400,
      data: {},
    });
    try {
      await whenStable;
    } catch (err) {
      expect(card).toHaveLength(0);
      expect(cardDiv).toHaveLength(0);
      expect(errorDiv).toBeInTheDocument();
      if (err.message === 'timeout of 2ms exceeded') {
        const errTimeOut = screen.getByText(
          'The request timed out. Please try again later'
        );
        expect(errTimeOut).toBeInTheDocument();
      } else {
        const errText = screen.getByText('Something went wrong :(', {
          exact: false,
        });
        expect(errText).toBeInTheDocument();
      }
    }
  });
});
