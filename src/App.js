import { useEffect } from 'react';
import useSWR from 'swr'

import './App.css';

const backendPort = 3001;
function App() {

  const Data = () => {
    const { data, error, isLoading } = useSWR(`http://localhost:${backendPort}/`, fetch)

    console.log(data, error, isLoading)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (data) return <div>hello</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          hello world
        </p>
        <Data />
      </header>
    </div>
  );
}

export default App;
