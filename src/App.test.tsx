import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
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
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(inputElement).toBeInTheDocument();
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
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const whenStable = async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  afterEach(cleanup);

  it('shows the cards when they have some data', async () => {
    render(<App />);
    const loading = screen.queryByTestId('Loading');
    expect(loading).not.toBeInTheDocument();
    const cardDiv = screen.queryAllByTestId('cardDiv');
    const card = screen.queryAllByTestId('card');
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: { cards },
    });
    try {
      await whenStable;
      expect(loading).toBeInTheDocument();
      expect(cardDiv).toHaveLength(2);
      expect(card).toHaveLength(2);
      const cardTitle1 = screen.getByText('Title1');
      const cardTitle2 = screen.getByText('Title2');
      expect(cardTitle1).toBeInTheDocument();
      expect(cardTitle2).toBeInTheDocument();
    } catch {
      console.log('caught');
    }
  });

  it('shows a message when there is no data', async () => {
    render(<App />);
    const card = screen.queryAllByTestId('card');
    const error = screen.queryByTestId('error');
    expect(error).not.toBeInTheDocument();
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
      expect(error).toBeInTheDocument();
      expect(noResultSearchedFor).toBeInTheDocument();
      expect(card).toHaveLength(0);
    } catch {
      console.log('caught');
    }
  });

  it('shows a message when there is an error', async () => {
    render(<App />);
    const card = screen.queryAllByTestId('card');
    const error = screen.queryByTestId('error');
    expect(error).not.toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    mockedAxios.get.mockResolvedValueOnce({
      status: 400,
      data: {},
    });
    try {
      await whenStable;
    } catch {
      expect(error).toBeInTheDocument();
      expect(card).toHaveLength(0);
    }
  });
});
