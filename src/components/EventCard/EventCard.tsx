import React from 'react';
import moment from 'moment-timezone';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { eventCardStyles } from './EventCard.styles';

const EventCard = () => {
  const events = useSelector((state: ReduxState) => {
    return state.events.events.getAllData();
  });

  const classes = eventCardStyles();

  return (
    <div>
      {events.map((event, index) => {
        return (
          <Card key={index} className={classes.cardContainer}>
            <CardActionArea className={classes.cardClick}>
              <CardMedia
                component="img"
                alt={event.name}
                height="140"
                image={event.photoURL}
                title={event.name}
              />
              <CardContent>
                <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                  {moment(event.start).format("ddd, MMM D, hh:mm A")}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  variant="h5"
                  component="h2"
                >
                  {event.name}
                </Typography>
                <Typography color="textSecondary" variant="body2" component="p" noWrap={true}>
                  {event.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
};

export default EventCard;
