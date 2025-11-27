import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  useEffect(()=>{
    async function fetchData(){
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts/`)
        if(!response.ok){
          throw new error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    fetchData();

  },[]);

  return (
    <>
    <h1>Эклипсы</h1>
    </>
  )
}

export default App
