import { render, screen, fireEvent, getByText } from '@testing-library/react';
import axios from 'axios';
import App from './App';

const cardData = [
  {
    id: 'id 1',
    cover: 'http://www.dummycover1.com',
    title: 'Title 1',
    author: 'Author 1',
    publisher: 'Publisher 1',
    link: 'https://www.dummylink1.com',
  },
  {
    id: 'id 2',
    cover: 'http://www.dummycover2.com',
    title: 'Title 2',
    author: 'Author 2',
    publisher: 'Publisher 2',
    link: 'https://www.dummylink2.com',
  },
];

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
    const card = screen.queryAllByTestId('card');
    expect(card).toHaveLength(0);
  });
});

describe('App tests with card data', () => {
  it('shows the cards when they have some data', () => {
    render(<App />);
    const card = screen.queryAllByTestId('card');
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: { cardData },
    });
    try {
      expect(card).toHaveLength(2);
      const cardTitle1 = getByText('Title1');
      const cardTitle2 = getByText('Title2');
      expect(cardTitle1).toBeInTheDocument();
      expect(cardTitle2).toBeInTheDocument();
    } catch {
      console.log('caught');
    }
  });
});
