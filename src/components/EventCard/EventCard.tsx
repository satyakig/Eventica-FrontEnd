import React from 'react';
import moment from 'moment-timezone';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { eventCardStyles } from './EventCard.styles';

const EventCard = (props: any) => {
  const classes = eventCardStyles();
  return (
<<<<<<< HEAD
    <Card key={props.event.name} className={classes.cardContainer}>
      <CardActionArea className={classes.cardClick}>
        <CardMedia
          component="img"
          alt={props.event.name}
          height="140"
          image={props.event.photoURL}
          title={props.event.name}
        />
        <CardContent>
          <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
            {moment(props.event.start).format('ddd, MMM D, hh:mm A')}
          </Typography>
          <Typography className={classes.title} color="textPrimary" variant="h5" component="h2">
            {props.event.name}
          </Typography>
          <Typography color="textSecondary" variant="body2" component="p" noWrap={false}>
            {props.event.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
=======
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
                  {moment(event.start).format('ddd, MMM DD, hh:mm A')}
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
>>>>>>> master
  );
};

export default EventCard;
