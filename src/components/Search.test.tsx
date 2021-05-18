import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from '@testing-library/react';
import axios from 'axios';
import Search from './Search';

afterEach(cleanup);

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

describe('Search tests', () => {
  const getData = jest.fn();

  it('renders without crashing', () => {
    render(<Search getData={getData} />);
  });

  it('has an input element with a label', () => {
    render(<Search getData={getData} />);
    const inputElement = screen.getByRole('searchbox');
    const label = screen.getByText('Search for a book by title or author');
    expect(inputElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('has a submit button with the text: search', () => {
    render(<Search getData={getData} />);
    const submitButton = screen.getByRole('button', { name: /search/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('has a select dropdown with options', () => {
    render(<Search getData={getData} />);
    const dropDown = screen.getByTestId('select');
    expect(dropDown).toBeInTheDocument();
    const title = screen.getByRole('option', { name: /title/i });
    expect(title).toBeInTheDocument();
    const author = screen.getByRole('option', { name: /author/i });
    expect(author).toBeInTheDocument();
  });

  it('checks the input is blank after submit is clicked', () => {
    render(<Search getData={getData} />);
    const inputElement = screen.getByRole('searchbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
    fireEvent.click(submitButton);
    expect(inputElement.value).toBe('');
  });
});
