import React from 'react';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>To be connected to Authentication module hosted at {process.env['REACT_APP_AUTH_API_DOMAIN']}</p>
      </header>
    </div>
  );
}

export default App;
