import React from 'react';
import EventGrid from '../EventGrid/EventGrid';
import { homePageStyles } from './HomePage.styles';
import { EventModal } from '../EventModal/EventModal';

const HomePage = () => {
  const classes = homePageStyles();

  return (
    <div className={classes.body}>
      <EventGrid />
      <EventModal />
    </div>
  );
};

export default HomePage;
