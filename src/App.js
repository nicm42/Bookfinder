import { useEffect } from 'react';
import Search from './components/Search';

const App = () => {
  useEffect(() => {
    document.title = 'Bookfinder';
  }, []);

  return <Search />;
};

export default App;
