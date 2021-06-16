import renderer from 'react-test-renderer';
import App from './App';
import Search from './components/Search';
import Card from './components/Card';
import Loading from './components/Loading';
import Error from './components/Error';
import Results from './components/Results';
import NavButtons from './components/NavButtons';
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
    const tree = renderer
      .create(<Results resultStart={1} resultEnd={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for both buttons', () => {
    const tree = renderer
      .create(
        <NavButtons
          isPreviousResults
          isMoreResults
          searchAgain={searchAgain}
          goBack={goBack}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for just next button', () => {
    const tree = renderer
      .create(
        <NavButtons
          isPreviousResults={false}
          isMoreResults
          searchAgain={searchAgain}
          goBack={goBack}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for just previous button', () => {
    const tree = renderer
      .create(
        <NavButtons
          isPreviousResults
          isMoreResults={false}
          searchAgain={searchAgain}
          goBack={goBack}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders nav buttons correctly for no buttons', () => {
    const tree = renderer
      .create(
        <NavButtons
          isPreviousResults={false}
          isMoreResults={false}
          searchAgain={searchAgain}
          goBack={goBack}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the app correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
