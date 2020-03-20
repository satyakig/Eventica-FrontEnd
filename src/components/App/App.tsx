import React from 'react';
import AuthContainer from 'containers/AuthContainer';
import EventsContainer from 'containers/EventsContainer';
import MetadataContainer from 'containers/MetadataContainer';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import Notifications from '../Notifications/Notifications';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './App.scss';

const App = () => {
  return (
    <main>
      <MetadataContainer />
      <AuthContainer />
      <EventsContainer />
      <Notifications />
      <LoadingScreen />
      <NavBar />
      <HomePage />
    </main>
  );
};

export default App;
