import { render, screen } from '@testing-library/react';
import Card from './Card';
import cards from '../dummyCardData';

describe('Search tests', () => {
  it('renders without crashing', () => {
    render(<Card card={cards.items[0]} />);
  });

  it('has all the expected information on the card', () => {
    render(<Card card={cards.items[0]} />);
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

  it('has all the expected text', () => {
    render(<Card card={cards.items[0]} />);
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

  it('has can cope with multiple authors', () => {
    render(<Card card={cards.items[1]} />);
    const author2 = screen.getByText('Author 2', { exact: false });
    const author3 = screen.getByText('Author 3', { exact: false });
    expect(author2).toBeInTheDocument();
    expect(author3).toBeInTheDocument();
  });

  it('has can cope with missing information', () => {
    render(<Card card={cards.items[2]} />);
    const coverImage = screen.queryByRole('img');
    const title = screen.queryByText('Title 2');
    const author2 = screen.queryByText('Author 2');
    const publisher = screen.queryByText('Publisher 2');
    const moreInfo = screen.queryByText('More information');
    const link = screen.queryByRole('link');
    expect(coverImage).not.toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
    expect(author2).not.toBeInTheDocument();
    expect(publisher).not.toBeInTheDocument();
    expect(moreInfo).not.toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });
});
