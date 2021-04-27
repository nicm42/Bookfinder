import { render, screen } from '@testing-library/react';
import Books from './Books';

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
