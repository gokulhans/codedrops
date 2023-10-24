import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(response => response.json()) // Parse the JSON response
      .then(data => setMessage(data.message)) // Update the state with the response data
      .catch(error => console.error('Error:', error));
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        {message} from Backend
      </h1>
    </>
  )
}

export default App
