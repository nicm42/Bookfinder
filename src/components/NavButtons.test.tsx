import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavButtons from './NavButtons';
import ButtonContext from '../contexts/ButtonContext';

describe('Nav button tests', () => {
  //const goBack = jest.fn();
  //const searchAgain = jest.fn();
  const getData = jest.fn();
  const setIsPreviousResults = jest.fn();
  const setIsMoreResults = jest.fn();
  const setCardData = jest.fn();

  it('renders without crashing', () => {
    const isPreviousResults = false;
    const isMoreResults = true;
    render(
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <NavButtons
          getData={getData}
          resultsPerPage={10}
          results={[]}
          setCardData={setCardData}
          totalItems={10}
        />
      </ButtonContext.Provider>
    );
    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).toBeInTheDocument();
    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).toBeInTheDocument();
  });

  it('disables the previous button when it should', () => {
    const isPreviousResults = false;
    const isMoreResults = true;
    render(
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <NavButtons
          getData={getData}
          resultsPerPage={10}
          results={[]}
          setCardData={setCardData}
          totalItems={10}
        />
      </ButtonContext.Provider>
    );
    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).not.toBeDisabled();
    const previousResults = screen.getByRole('button', {
      name: /Previous/i,
    });
    expect(previousResults).toBeDisabled();
  });

  it('disables the next button when it should', () => {
    const isPreviousResults = true;
    const isMoreResults = false;
    render(
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <NavButtons
          getData={getData}
          resultsPerPage={10}
          results={[]}
          setCardData={setCardData}
          totalItems={10}
        />
      </ButtonContext.Provider>
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
  const getData = jest.fn();
  const setIsPreviousResults = jest.fn();
  const setIsMoreResults = jest.fn();
  const setCardData = jest.fn();

  it('tests keyboard nav when both previous and next enabled', () => {
    const isPreviousResults = true;
    const isMoreResults = true;

    render(
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <NavButtons
          getData={getData}
          resultsPerPage={10}
          results={[]}
          setCardData={setCardData}
          totalItems={10}
        />
      </ButtonContext.Provider>
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
    const isPreviousResults = false;
    const isMoreResults = true;

    render(
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <NavButtons
          getData={getData}
          resultsPerPage={10}
          results={[]}
          setCardData={setCardData}
          totalItems={10}
        />
      </ButtonContext.Provider>
    );
    expect(document.body).toHaveFocus();
    userEvent.tab();

    const moreResults = screen.getByRole('button', { name: /Next/i });
    expect(moreResults).toHaveFocus();

    userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('tests keyboard nav when next is disabled', () => {
    const isPreviousResults = true;
    const isMoreResults = false;

    render(
      <ButtonContext.Provider
        value={{
          isPreviousResults,
          setIsPreviousResults,
          isMoreResults,
          setIsMoreResults,
        }}
      >
        <NavButtons
          getData={getData}
          resultsPerPage={10}
          results={[]}
          setCardData={setCardData}
          totalItems={10}
        />
      </ButtonContext.Provider>
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
