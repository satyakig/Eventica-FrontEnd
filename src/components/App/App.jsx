import React, { useEffect } from 'react';
import './App.scss';
import { initializeApp } from '../../lib/Firebase';
import HomePage from './HomePage';
// import { useSelector } from 'react-redux';

import NavBar from './NavBar';

const App = () => {
  useEffect(() => {
    // Initialize the firebase app
    initializeApp();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <HomePage />
    </div>
  );
};

export default App;
