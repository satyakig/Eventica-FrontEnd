import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AuthContainer from 'containers/AuthContainer';
import EventsContainer from 'containers/EventsContainer';
import MetadataContainer from 'containers/MetadataContainer';
import NotificationsContainer from 'containers/NotificationContainer';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './App.scss';

const App = (props: RouteComponentProps) => {
  useEffect(() => {
    if (props.location.pathname !== '/') {
      props.history.push('');
    }
  }, [props.location, props.history]);

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

export default withRouter(App);
