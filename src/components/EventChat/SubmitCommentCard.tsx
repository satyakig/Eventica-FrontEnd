import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  Input,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { uploadPhotoToFirestore } from 'lib/Firebase';
import { createComment, CreateCommentType } from 'lib/CommentRequests';
import { setNetworkError } from 'redux/actions/AppStateActions';
import { commentCardStyles } from './CommentCard.styles';

const SUBMIT_COMMENT_PHOTO = 'SUBMIT_COMMENT_PHOTO';

interface SubmitCommentCardProps {
  eventId: string;
}

const SubmitCommentCard = (props: SubmitCommentCardProps) => {
  const dispatch = useDispatch();
  const classes = commentCardStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [commentMsg, setCommentMsg] = useState('');
  const [commentPhotoURL, setCommentPhotoURL] = useState('');

  function uploadPhoto() {
    const element = document.getElementById(SUBMIT_COMMENT_PHOTO);
    if (element) {
      element.click();
    }
  }

  const handleCommentPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const fileType = fileList ? fileList[0].type.substring(0, 5) : 'error';
    if (fileType === 'image') {
      uploadPhotoToFirestore(e, user.uid).then((link) => {
        setCommentPhotoURL(link);
      });
    } else {
      dispatch(setNetworkError('Invalid Picture Format'));
      setCommentPhotoURL(user.photoURL);
      e.target.value = '';
    }
  };

  const handleCommentMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentMsg(event.target.value);
  };

  function handleSubmit() {
    if (!commentMsg && !commentPhotoURL) {
      return;
    }

    const comment: CreateCommentType = {
      eid: props.eventId,
      message: commentMsg,
      photoURL: commentPhotoURL,
    };

    dispatch(createComment(comment));

    setCommentMsg('');
    setCommentPhotoURL('');
  }

  return (
    <Card className={classes.root}>
      <CardHeader avatar={<Avatar alt={user.name} src={user.photoURL} />} title="submit a post" />
      {commentPhotoURL ? <CardMedia component="img" image={commentPhotoURL} /> : null}
      <Input
        id={SUBMIT_COMMENT_PHOTO}
        type="file"
        onChange={handleCommentPictureChange}
        style={{ display: 'none' }}
        inputProps={{ accept: 'image/*' }}
      />
      <TextField
        value={commentMsg}
        onChange={handleCommentMsgChange}
        multiline={true}
        rows="3"
        placeholder="write something..."
        className={classes.textField}
        variant="filled"
      />
      <CardActions>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Button size="small" color="primary" onClick={uploadPhoto}>
            Upload Photo
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleSubmit}
            disabled={!commentMsg && !commentPhotoURL}
          >
            Submit
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SubmitCommentCard;
