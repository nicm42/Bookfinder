/// <reference types="Jest" />

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
    const author = screen.getByText('by Author 1');
    const publisher = screen.getByText('Publisher: Publisher 1');
    const moreInfo = screen.getByText('More information');
    const link = screen.getByRole('link');
    expect(coverImage).toHaveAttribute('src', 'http://www.dummycover1.com');
    expect(coverImage).toHaveAttribute('alt', 'Cover for Title 1');
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(moreInfo).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.dummylink1.com');
  });

  it('has can cope with two authors', () => {
    render(<Card card={cards.items[1]} />);
    const author2 = screen.getByText('Author 2', { exact: false });
    const author3 = screen.getByText(' & Author 3', { exact: false });
    expect(author2).toBeInTheDocument();
    expect(author3).toBeInTheDocument();
  });

  it('has can cope with three authors', () => {
    render(<Card card={cards.items[3]} />);
    const author4 = screen.getByText('Author 4', { exact: false });
    const author5 = screen.getByText(', Author 5', { exact: false });
    const author6 = screen.getByText(' & Author 6', { exact: false });
    expect(author4).toBeInTheDocument();
    expect(author5).toBeInTheDocument();
    expect(author6).toBeInTheDocument();
  });

  it('has can cope with missing information', () => {
    render(<Card card={cards.items[2]} />);
    const coverImage = screen.getByRole('img');
    const title = screen.getByText('Title missing');
    const author = screen.getByText('Author missing');
    const publisher = screen.getByText('Publisher missing');
    const moreInfo = screen.getByText('Link missing');
    const link = screen.queryByRole('link');
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', 'generic-book-cover.jpg');
    expect(coverImage).toHaveAttribute('alt', 'Book cover');
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(moreInfo).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });
});
