import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import EventCard from '../EventCard/EventCard';

const EventGrid = () => {
  const events = useSelector((state: ReduxState) => {
    return state.events.events.getAllData();
  });

  return (
    <Container maxWidth="xl">
      <Grid container={true} spacing={3}>
        {events.map((event, index) => {
          return (
            <Grid item={true} key={index} xs={12} sm={6} md={4} lg={3}>
              <EventCard event={event} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default EventGrid;
