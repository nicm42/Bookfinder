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
});
