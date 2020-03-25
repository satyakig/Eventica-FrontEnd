import React, { useState } from 'react';
import moment from 'moment-timezone';
import { EventCommentType } from '../../redux/models/EventModel';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import { commentCardStyles } from './CommentCard.styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';

const COMMENT_TIME_FORMAT = 'MMM D YYYY, h:mm a';

interface EventCardProps {
  comment: EventCommentType;
}

const CommentCard = (props: EventCardProps) => {
  const classes = commentCardStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [comment, setComment] = useState<EventCommentType>(props.comment);

  // Edit comment // Delete comment
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt={comment.createdBy.name} src={comment.createdBy.profile} />}
        action={
          comment.createdBy.email === user.email ? (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={comment.createdBy.name}
        subheader={moment(comment.lastUpdated).format(COMMENT_TIME_FORMAT)}
      />
      {comment.photoURL ? <CardMedia className={classes.media} image={comment.photoURL} /> : null}
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {comment.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
