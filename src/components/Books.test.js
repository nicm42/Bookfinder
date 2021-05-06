import { render, screen } from '@testing-library/react';
import Books from './Books';

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

jest.mock('./dummyCards', () => ({
  cards,
}));

describe('Search tests', () => {
  it('renders without crashing', () => {
    render(<Books />);
  });

  it('has has some cards', () => {
    render(<Books />);
    const card = screen.getAllByTestId('card');
    expect(card).toHaveLength(2);
  });

  it('has all the expected information in the cards', () => {
    render(<Books />);
    const coverImage = screen.getAllByRole('img');
    const title = screen.getAllByTestId('title');
    const author = screen.getAllByTestId('author');
    const publisher = screen.getAllByTestId('publisher');
    const moreInfo = screen.getAllByRole('link');
    expect(coverImage).toHaveLength(2);
    expect(title).toHaveLength(2);
    expect(author).toHaveLength(2);
    expect(publisher).toHaveLength(2);
    expect(moreInfo).toHaveLength(2);
  });
});
