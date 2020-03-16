import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { eventCardStyles } from './EventCard.styles';
import { EventModal } from '../EventModal/EventModal';
import { EventModel } from '../../redux/models/EventModel';

export type EventCardProps = {
  event: EventModel;
};

const EventCard = (props: EventCardProps) => {
  const classes = eventCardStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function cardClick(): void {
    setIsModalOpen(true);
    console.log(props.event);
  }

  function closeEventModal() {
    setIsModalOpen(false);
  }

  return (
    <React.Fragment>
      <EventModal openEventModal={isModalOpen} handleClose={closeEventModal} event={props.event} />
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
            {moment(props.event.start).format("ddd h:mma, MMM DD 'YY")}
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
    </React.Fragment>
  );
};

export default EventCard;
