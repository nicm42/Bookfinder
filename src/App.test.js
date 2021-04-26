import { render, screen } from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('has a Search component', () => {
    render(<App />);
    const inputElement = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
