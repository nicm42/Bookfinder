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
      infoLink: 'https://www.dummylink1.com',
    },
  },
  {
    id: 'id 2',
    volumeInfo: {
      imageLinks: {
        thumbnail: 'http://www.dummycover2.com',
      },
      title: 'Title 2',
      authors: ['Author 2', 'Author 3'],
      publisher: 'Publisher 2',
      infoLink: 'https://www.dummylink2.com',
    },
  },
];

describe('Search tests', () => {
  it('renders without crashing', () => {
    render(<Card card={cardData[0]} />);
  });

  it('has all the expected information on the card', () => {
    render(<Card card={cardData[0]} />);
    const coverImage = screen.getByRole('img');
    const title = screen.getByTestId('title');
    const author = screen.getByTestId('author');
    const publisher = screen.getByTestId('publisher');
    const moreInfo = screen.getByRole('link');
    expect(coverImage).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(moreInfo).toBeInTheDocument();
  });

  it('has all the expected text (first card)', () => {
    render(<Card card={cardData[0]} />);
    const coverImage = screen.getByRole('img');
    const title = screen.getByText('Title 1');
    const author = screen.getByText('Author 1');
    const publisher = screen.getByText('Publisher 1');
    const moreInfo = screen.getByText('More information');
    const link = screen.getByRole('link');
    expect(coverImage).toHaveAttribute('src', 'http://www.dummycover1.com');
    expect(coverImage).toHaveAttribute('alt', 'Title 1');
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(moreInfo).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.dummylink1.com');
  });

  it('has all the expected text (second card - two authors)', () => {
    render(<Card card={cardData[1]} />);
    const coverImage = screen.getByRole('img');
    const title = screen.getByText('Title 2');
    const author2 = screen.getByText('Author 2', { exact: false });
    const author3 = screen.getByText('Author 3', { exact: false });
    const publisher = screen.getByText('Publisher 2');
    const moreInfo = screen.getByText('More information');
    const link = screen.getByRole('link');
    expect(coverImage).toHaveAttribute('src', 'http://www.dummycover2.com');
    expect(coverImage).toHaveAttribute('alt', 'Title 2');
    expect(title).toBeInTheDocument();
    expect(author2).toBeInTheDocument();
    expect(author3).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(moreInfo).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.dummylink2.com');
  });
});
