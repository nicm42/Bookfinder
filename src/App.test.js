import { render, screen } from '@testing-library/react';
import App from './App';

const cards = [
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

jest.mock('./components/dummyCards', () => ({
  cards,
}));

describe('App tests', () => {
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

  it('has a Book component', () => {
    render(<App />);
    const card = screen.getAllByTestId('card');
    expect(card).toHaveLength(2);
  });
});
