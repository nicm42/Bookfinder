import { render, screen } from '@testing-library/react';
import Card from './Card';

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
    render(<Card card={cards[0]} />);
  });

  it('has all the expected information on the card', () => {
    render(<Card card={cards[0]} />);
    const coverImage = screen.getAllByRole('img');
    const title = screen.getAllByTestId('title');
    const author = screen.getAllByTestId('author');
    const publisher = screen.getAllByTestId('publisher');
    const moreInfo = screen.getAllByRole('link');
    expect(coverImage).toHaveLength(1);
    expect(title).toHaveLength(1);
    expect(author).toHaveLength(1);
    expect(publisher).toHaveLength(1);
    expect(moreInfo).toHaveLength(1);
  });
});
