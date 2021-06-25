import renderer from 'react-test-renderer';
import App from './App';
import Search from './components/Search';
import Card from './components/Card';
import Loading from './components/Loading';
import Error from './components/Error';
import Results from './components/Results';
import NavButtons from './components/NavButtons';
import ButtonContext from './contexts/ButtonContext';
import CountContext from './contexts/CountContext';
import cards from './dummyCardData';

describe('Snapshot tests', () => {
  const getData = jest.fn();
  const goBack = jest.fn();
  const searchAgain = jest.fn();

  it('renders the search correctly', () => {
    const tree = renderer.create(<Search getData={getData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the cards correctly', () => {
    const tree = renderer.create(<Card card={cards.items[0]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading spinner correctly', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders error message correctly', () => {
    const tree = renderer
      .create(<Error errorMessage="This is an error message" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders results text correctly', () => {
    const resultStart = 1;
    const setResultStart = jest.fn();
    const resultEnd = 10;
    const setResultEnd = jest.fn();

    const tree = renderer
      .create(
        <CountContext.Provider
          value={{ resultStart, setResultStart, resultEnd, setResultEnd }}
        >
          <Results />
        </CountContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for both buttons', () => {
    const isPreviousResults = true;
    const setIsPreviousResults = jest.fn();
    const isMoreResults = true;
    const setIsMoreResults = jest.fn();
    const setCardData = jest.fn();

    const tree = renderer
      .create(
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for just next button', () => {
    const isPreviousResults = false;
    const setIsPreviousResults = jest.fn();
    const isMoreResults = true;
    const setIsMoreResults = jest.fn();
    const setCardData = jest.fn();

    const tree = renderer
      .create(
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for just previous button', () => {
    const isPreviousResults = true;
    const setIsPreviousResults = jest.fn();
    const isMoreResults = false;
    const setIsMoreResults = jest.fn();
    const setCardData = jest.fn();

    const tree = renderer
      .create(
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for no buttons', () => {
    const isPreviousResults = false;
    const setIsPreviousResults = jest.fn();
    const isMoreResults = false;
    const setIsMoreResults = jest.fn();
    const setCardData = jest.fn();

    const tree = renderer
      .create(
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the app correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
