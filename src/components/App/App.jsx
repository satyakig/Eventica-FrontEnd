import React, { useEffect } from 'react';
import './App.scss';
import { initializeApp } from '../../lib/Firebase';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';

const App = () => {
  useEffect(() => {
    // Initialize the firebase app
    initializeApp();
  }, []);

  return (
    <div className="App flex-container">
      <NavBar />
      <HomePage />
    </div>
  );
};

export default App;
