import React from 'react';
import EventGrid from '../EventGrid/EventGrid';
import { homePageStyles } from './HomePage.styles';

const HomePage = () => {
  const classes = homePageStyles();

  return (
    <div className={classes.body}>
      <EventGrid />
    </div>
  );
};

export default HomePage;
