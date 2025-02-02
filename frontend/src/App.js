import React, {useState, useEffect} from 'react';
import './App.css';

function App(){
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
    .then((response) => response.text())
    .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <p id='main'>Good Things Take Time</p>
    </div>
  );
}
export default App;