import React from 'react';
import moment from 'moment-timezone';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { EventModel, UserEventModel } from 'redux/models/EventModel';
import { updateSelectedEventAction } from 'redux/actions/EventsActions';
import { useDispatch } from 'react-redux';
import { eventCardStyles } from './EventCard.styles';

interface EventCardProps {
  event: EventModel | UserEventModel;
}

const EVENT_TIME_FORMAT = 'ddd MMM D, h:mm a';

const EventCard = (props: EventCardProps) => {
  const dispatch = useDispatch();
  const classes = eventCardStyles();

  function cardClick(): void {
    dispatch(updateSelectedEventAction(props.event.eid));
  }

  return (
    <Card className={classes.cardContainer} onClick={cardClick}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        alt={props.event.name}
        image={props.event.photoURL}
        title={props.event.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography className={classes.subtitle} color="textSecondary" gutterBottom={true}>
          {moment(props.event.start).format(EVENT_TIME_FORMAT)}
        </Typography>
        <Typography
          className={classes.title}
          color="textPrimary"
          variant="h5"
          component="h2"
          gutterBottom={true}
        >
          {props.event.name}
        </Typography>
        <Typography className={classes.desc} color="textSecondary" variant="body2" component="p">
          {props.event.desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
