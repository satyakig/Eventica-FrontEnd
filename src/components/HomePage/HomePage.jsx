import React from 'react';
import logo from '../../assets/logo.svg';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="body">
      <img src={logo} className="logo" alt="logo" />
      <p>
        Edit <code>src/components/App/App.js</code> and save to reload.
      </p>
      <a className="link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
};

export default HomePage;
