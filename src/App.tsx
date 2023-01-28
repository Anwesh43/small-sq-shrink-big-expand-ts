import React from 'react';
import logo from './logo.svg';
import './App.css';
import SqShrinkAndExpand from './SqShrinkAndExpand';
function App() {
  return (
    <div className="App">
      <SqShrinkAndExpand color = 'green' parts = {3}></SqShrinkAndExpand>
    </div>
  );
}

export default App;
