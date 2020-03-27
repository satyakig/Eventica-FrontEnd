import React, { useState } from 'react';
import moment from 'moment-timezone';
import { EventCommentType } from '../../redux/models/EventModel';
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
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
import { commentCardStyles } from './CommentCard.styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';
import { v4 } from 'uuid';
import { getStorage } from '../../lib/Firebase';
import { updateComment, UpdateCommentType } from '../../lib/CommentRequests';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const [commentMsg, setCommentMsg] = useState(comment.message);
  const [commentPhotoURL, setCommentPhotoURL] = useState(comment.photoURL);
  const [editMode, setEditMode] = useState(false);

  const createdByUser = comment.createdBy.email === user.email;

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

  const handleCommentPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length !== 1) {
      return;
    }

    const id = `${v4()}${user.uid}`;
    const file = e.target.files[0];

    const storageRef = getStorage().child(id);
    storageRef
      .put(file)
      .then(() => {
        return storageRef.getDownloadURL();
      })
      .then((link) => {
        setCommentPhotoURL(link);
      });
  };

  const handleCommentMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentMsg(event.target.value);
  };

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

  function toggleEditMode() {
    setEditMode(!editMode);
    handleClose();
  }

  function handleDelete() {
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
      {commentPhotoURL ? <CardMedia className={classes.media} image={commentPhotoURL} /> : null}
      {!editMode ? (
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {commentMsg}
          </Typography>
        </CardContent>
      ) : (
        <div>
          <Input
            id={EDIT_COMMENT_PHOTO}
            type="file"
            onChange={handleCommentPictureChange}
            style={{ display: 'none' }}
          />
          <CardActionArea>
            <TextField
              value={commentMsg}
              onChange={handleCommentMsgChange}
              multiline
              rows="3"
              variant="filled"
              className={classes.textField}
            />
          </CardActionArea>
          <CardActions>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Button size="small" color="primary" onClick={uploadPhoto}>
                Update Photo
              </Button>
              <Button size="small" color="primary" onClick={handleUpdate}>
                Update Comment
              </Button>
            </Grid>
          </CardActions>
        </div>
      )}
    </Card>
  );
};

export default CommentCard;
