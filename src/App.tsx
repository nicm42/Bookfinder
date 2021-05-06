import { useEffect } from 'react';
import Search from './components/Search';
import Books from './components/Books';

const App = () => {
  useEffect(() => {
    document.title = 'Bookfinder';
  }, []);

  return (
    <>
      <Search />
      <Books />
    </>
  );
};

export default App;
