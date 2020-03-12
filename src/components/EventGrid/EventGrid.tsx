import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import EventCard from '../EventCard/EventCard';

const EventGrid = (props: any) => {
  const events = useSelector((state: ReduxState) => {
    return state.events.events.getAllData();
  });

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {events.map((event, index) => {
          return (
            <Grid item xs={12} sm={3}>
              <EventCard event={event} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default EventGrid;
