import { useEffect } from 'react';
import useSWR from 'swr'
import Table from './components/Table';
import './index.css';

const backendPort = 3001;
function App() {
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const Data = () => {
    const { data, error, isLoading } = useSWR(`http://localhost:${backendPort}/read`, fetcher)
    console.log(data, error, isLoading)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (data) return <div>{data.message}</div>
  }

  useEffect(() => {
  }, [])

  // const fetchData = () => {
  //   fetch(`http://localhost:${backendPort}/read`)
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }
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
