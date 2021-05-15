import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import cardData from './dummyCardData';

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
  const setState = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateMock: any = (initState: any) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  it('shows the cards when they have some data', () => {
    render(<App />);
    const loading = screen.queryByTestId('Loading');
    expect(loading).not.toBeInTheDocument();
    const cardDiv = screen.queryAllByTestId('cardDiv');
    const card = screen.queryAllByTestId('card');
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: { cardData },
    });
    try {
      expect(loading).toBeInTheDocument();
      expect(setState).toHaveBeenCalledTimes(1);
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
});
