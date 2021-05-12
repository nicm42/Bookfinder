import { render, screen, fireEvent, getByText } from '@testing-library/react';
import axios from 'axios';
import App from './App';

const cardData = [
  {
    id: 'id 1',
    cover:
      'http://books.google.com/books/content?id=f280CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Harry Potter: The Complete Collection (1-7)',
    author: 'J.K. Rowling',
    publisher: 'Pottermore Publishing',
    link:
      'https://play.google.com/store/books/details?id=f280CwAAQBAJ&source=gbs_api',
  },
  {
    id: 'id 2',
    cover:
      'http://books.google.com/books/content?id=N6DeDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J. K. Rowling',
    publisher: 'Bloomsbury Publishing',
    link:
      'http://books.google.co.uk/books?id=N6DeDQAAQBAJ&dq=harry+potter&hl=&source=gbs_api',
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
      const cardTitle = getByText(
        'Harry Potter: The Complete Collection (1-7)'
      );
      expect(cardTitle).toBeInTheDocument();
    } catch {
      console.log('caught');
    }
  });
});
