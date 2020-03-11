import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import moment from 'moment-timezone';
import './HomePage.scss';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    subtitle: {
      fontSize: 14,
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
    cardContainer: {
      height: '100%',
      overflowWrap: 'break-word',
    },
    cardClick: {
      height: '100%',
    },
  });
});

const HomePage = () => {
  const events = useSelector((state: ReduxState) => {
    return state.events.events.getAllData();
  });

  const classes = useStyles();

  return (
    <div className="body">
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

export default HomePage;
