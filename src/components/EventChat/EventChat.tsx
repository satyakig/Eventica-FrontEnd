import React, { useEffect, useState } from 'react';
import { eventChatStyles } from './EventChat.styles';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { DB_PATHS, getDb } from 'lib/Firebase';
import { EventCommentType } from 'redux/models/EventModel';
import CommentCard from './CommentCard';
import SubmitCommentCard from './SubmitCommentCard';

export const EventChat = (): JSX.Element => {
  const classes = eventChatStyles();

  const eventId = useSelector((state: ReduxState) => {
    return state.events.selectedEvent;
  });

  const [eventComments, setEventComments] = useState<EventCommentType[]>([]);

  /**
   * Load the comments for the selected event
   */
  useEffect(() => {
    const unsubscribe = getDb()
      .collection(DB_PATHS.EVENT_COMMENTS)
      .where('eid', '==', eventId)
      .onSnapshot((doc) => {
        const data = doc.docs.map((value) => {
          return value.data() as EventCommentType;
        });
        data.sort((a, b) => {
          return b.lastUpdated - a.lastUpdated;
        });

        setEventComments(data);
      });

    return () => {
      return unsubscribe();
    };
  }, [eventId]);

  return (
    <Grid container={true} alignItems="stretch">
      <Grid item={true} xs={12} className={classes.gridItem}>
        <SubmitCommentCard eventId={eventId} />
      </Grid>
      {eventComments.map((comment, index) => {
        return (
          <Grid item={true} key={index} xs={12} className={classes.gridItem}>
            <CommentCard eventId={eventId} comment={comment} />
          </Grid>
        );
      })}
    </Grid>
  );
};
