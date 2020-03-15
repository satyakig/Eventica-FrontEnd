import React from 'react';
import moment from 'moment-timezone';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { eventCardStyles } from './EventCard.styles';

const EventCard = (props: any) => {
  const classes = eventCardStyles();

  function cardClick(): void {
    console.log(props.event);
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
  );
};

export default EventCard;
