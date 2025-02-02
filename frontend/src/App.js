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
        <div id='main-div'>
          <p id='message'>Good Things Take Time</p>
      </div>
    </div>
  );
}
export default App;