import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { EventCommentType } from 'redux/models/EventModel';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Input,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { uploadPhotoToFirestore } from 'lib/Firebase';
import {
  deleteComment,
  DeleteCommentType,
  updateComment,
  UpdateCommentType,
} from 'lib/CommentRequests';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { setNetworkError } from 'redux/actions/AppStateActions';
import { commentCardStyles } from './CommentCard.styles';

const COMMENT_TIME_FORMAT = 'MMM D YYYY, h:mm a';
const EDIT_COMMENT_PHOTO = 'EDIT_COMMENT_PHOTO';

interface EventCardProps {
  eventId: string;
  comment: EventCommentType;
}

const CommentCard = (props: EventCardProps) => {
  const dispatch = useDispatch();
  const classes = commentCardStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState<EventCommentType>(props.comment);
  const [commentMsg, setCommentMsg] = useState('');
  const [commentPhotoURL, setCommentPhotoURL] = useState('');
  const [editMode, setEditMode] = useState(false);

  const createdByUser = comment.createdBy.email === user.email;

  useEffect(() => {
    setComment(props.comment);
    setCommentMsg(props.comment.message);
    setCommentPhotoURL(props.comment.photoURL);
  }, [props.comment]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function uploadPhoto() {
    const element = document.getElementById(EDIT_COMMENT_PHOTO);
    if (element) {
      element.click();
    }
  }

  function removePhoto() {
    setCommentPhotoURL('');
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

  function toggleEditMode() {
    if (editMode) {
      // Reset local edits
      setComment(props.comment);
      setCommentMsg(props.comment.message);
      setCommentPhotoURL(props.comment.photoURL);
    }

    setEditMode(!editMode);
    handleClose();
  }

  function handleUpdate() {
    if (!commentMsg && !commentPhotoURL) {
      return;
    }

    const updatedComment: UpdateCommentType = {
      eid: props.eventId,
      message: commentMsg,
      photoURL: commentPhotoURL,
      cid: comment.cid,
    };

    dispatch(updateComment(updatedComment));
    toggleEditMode();
  }

  function handleDelete() {
    const deletedComment: DeleteCommentType = {
      eid: props.eventId,
      cid: comment.cid,
    };

    dispatch(deleteComment(deletedComment));
    handleClose();
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt={comment.createdBy.name} src={comment.createdBy.profile} />}
        action={
          createdByUser ? (
            <div>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted={true}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem key="edit" onClick={toggleEditMode}>
                  <ListItemIcon className={classes.listIcon}>
                    <EditIcon color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <Typography>edit</Typography>
                </MenuItem>
                <MenuItem key="delete" onClick={handleDelete}>
                  <ListItemIcon className={classes.listIcon}>
                    <DeleteIcon color="secondary" fontSize="small" />
                  </ListItemIcon>
                  <Typography>delete</Typography>
                </MenuItem>
              </Menu>
            </div>
          ) : null
        }
        title={comment.createdBy.name}
        subheader={moment(comment.lastUpdated).format(COMMENT_TIME_FORMAT)}
      />
      {commentPhotoURL ? <CardMedia component="img" image={commentPhotoURL} /> : null}
      {!editMode ? (
        commentMsg ? (
          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
              {commentMsg}
            </Typography>
          </CardContent>
        ) : null
      ) : (
        <div>
          <Input
            id={EDIT_COMMENT_PHOTO}
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
            placeholder="Add text..."
            className={classes.textField}
            variant="filled"
          />
          <CardActions>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Button size="small" color="primary" onClick={uploadPhoto}>
                {!commentPhotoURL ? 'Add Photo' : 'Update Photo'}
              </Button>
              {commentPhotoURL ? (
                <Button size="small" color="primary" onClick={removePhoto}>
                  Remove Photo
                </Button>
              ) : null}
              <Button size="small" color="primary" onClick={toggleEditMode}>
                Cancel
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={handleUpdate}
                disabled={!commentMsg && !commentPhotoURL}
              >
                Update
              </Button>
            </Grid>
          </CardActions>
        </div>
      )}
    </Card>
  );
};

export default CommentCard;
