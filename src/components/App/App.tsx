import React from 'react';
import AuthContainer from 'containers/AuthContainer';
import EventsContainer from 'containers/EventsContainer';
import MetadataContainer from 'containers/MetadataContainer';
import NotificationsContainer from 'containers/NotificationContainer';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './App.scss';

const App = () => {
  return (
    <main>
      <MetadataContainer />
      <AuthContainer />
      <EventsContainer />
      <NotificationsContainer />
      <NotificationPopup />
      <LoadingScreen />
      <NavBar />
      <HomePage />
    </main>
  );
};

export default App;
