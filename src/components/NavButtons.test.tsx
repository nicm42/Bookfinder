import { render, screen } from '@testing-library/react';
import NavButtons from './NavButtons';

describe('Nav button tests', () => {
  const goBack = jest.fn();
  const searchAgain = jest.fn();

  it('renders without crashing', () => {
    render(
      <NavButtons
        isPreviousResults={false}
        isMoreResults
        searchAgain={searchAgain}
        goBack={goBack}
      />
    );
    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).toBeInTheDocument();
    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).toBeInTheDocument();
  });

  it('disables the previous button when it should', () => {
    render(
      <NavButtons
        isPreviousResults={false}
        isMoreResults
        searchAgain={searchAgain}
        goBack={goBack}
      />
    );
    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).not.toBeDisabled();
    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).toBeDisabled();
  });

  it('disables the next button when it should', () => {
    render(
      <NavButtons
        isPreviousResults
        isMoreResults={false}
        searchAgain={searchAgain}
        goBack={goBack}
      />
    );
    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).toBeDisabled();
    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).not.toBeDisabled();
  });
});
