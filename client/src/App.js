import React from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import VocalShell from './components/VocalShell';

function App() {
  return (
    <div className="App">
      {/* <VocalShell /> */}
      <Header />
      <Body />
    </div>
  );
}

export default App;