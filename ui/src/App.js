import { useEffect } from 'react';
import useSWR from 'swr'
import Table from './components/Table';
import './index.css';

const backendPort = 3001;
function App() {

  const Data = () => {
    const { data, error, isLoading } = useSWR(`http://localhost:${backendPort}/`, fetch)

    console.log(data, error, isLoading)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (data) return <div>{data.status}</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        
        {/* <label for="username">Username</label>
        <input id="username" className="text-slate-500" type="text" /> */}
        <p>
          High score
        </p>
        <Data />
        {/* <Table /> */}
      </header>
    </div>
  );
}

export default App;
