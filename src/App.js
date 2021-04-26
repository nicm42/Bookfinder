import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Bookfinder';
  }, []);

  return <div className="App"></div>;
}

export default App;
