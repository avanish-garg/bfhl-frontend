import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const json = JSON.parse(input);
      setError('');

      const res = await fetch("https://your-backend-url.onrender.com/bfhl", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
      });

      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  const handleSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFilter(options);
  };

  return (
    <div className="App">
      <h2>Bajaj Finserv Health Dev Challenge</h2>
      <textarea rows="6" cols="60" onChange={(e) => setInput(e.target.value)} placeholder='Enter JSON e.g. {"data": ["A", "2"]}' />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <>
          <h4>Filter by:</h4>
          <select multiple onChange={handleSelect}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase</option>
          </select>

          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(
            Object.fromEntries(
              Object.entries(response).filter(([key]) => filter.includes(key))
            ), null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
