import { render, screen } from '@testing-library/react';
import Card from './Card';

const cardData = [
  {
    id: 'id 1',
    volumeInfo: {
      imageLinks: {
        thumbnail: 'http://www.dummycover1.com',
      },
      title: 'Title 1',
      authors: ['Author 1'],
      publisher: 'Publisher 1',
      infolink: 'https://www.dummylink1.com',
    },
  },
  {
    id: 'id 2',
    volumeInfo: {
      imageLinks: {
        thumbnail: 'http://www.dummycover2.com',
      },
      title: 'Title 2',
      authors: ['Author 2'],
      publisher: 'Publisher 2',
      infolink: 'https://www.dummylink2.com',
    },
  },
];

describe('Search tests', () => {
  it('renders a dummy test for now', () => {
    expect(true).toBeTruthy();
  });
  it('renders without crashing', () => {
    render(<Card card={cardData[0]} />);
  });

  /* it('has all the expected information on the card', () => {
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
  }); */
});
