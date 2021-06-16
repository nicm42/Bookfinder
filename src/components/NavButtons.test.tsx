import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Keyboard navigation tests', () => {
  const goBack = jest.fn();
  const searchAgain = jest.fn();

  it('tests keyboard nav when both previous and next enabled', () => {
    render(
      <NavButtons
        isPreviousResults
        isMoreResults
        searchAgain={searchAgain}
        goBack={goBack}
      />
    );
    expect(document.body).toHaveFocus();
    userEvent.tab();

    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).toHaveFocus();
    userEvent.tab();

    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).toHaveFocus();

    userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('tests keyboard nav when previous is disabled', () => {
    render(
      <NavButtons
        isPreviousResults={false}
        isMoreResults
        searchAgain={searchAgain}
        goBack={goBack}
      />
    );
    expect(document.body).toHaveFocus();
    userEvent.tab();

    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).toHaveFocus();

    userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('tests keyboard nav when next is disabled', () => {
    render(
      <NavButtons
        isPreviousResults
        isMoreResults={false}
        searchAgain={searchAgain}
        goBack={goBack}
      />
    );
    expect(document.body).toHaveFocus();
    userEvent.tab();

    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).toHaveFocus();

    userEvent.tab();
    expect(document.body).toHaveFocus();
  });
});
