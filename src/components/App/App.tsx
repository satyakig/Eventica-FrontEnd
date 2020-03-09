import React from 'react';
import AuthContainer from 'containers/AuthContainer';
import EventsContainer from 'containers/EventsContainer';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import './App.scss';

const App = () => {
  return (
    <main>
      <AuthContainer />
      <EventsContainer />
      <NavBar />
      <HomePage />
    </main>
  );
};

export default App;
