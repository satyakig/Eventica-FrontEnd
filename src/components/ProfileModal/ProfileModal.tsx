import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  DialogTitle,
  DialogActions,
  Container,
  Input,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { updateUser } from 'lib/UserRequests';
import { uploadPhotoToFirestore } from 'lib/Firebase';
import { profileModalStyles } from './ProfileModal.styles';
import { setNetworkError } from 'redux/actions/AppStateActions';

const FILE_UPLOAD_EL = 'FILE_UPLOAD_EL';

interface ProfileProps {
  open: boolean;
  handleClose: () => void;
}

const ProfileModal = (props: ProfileProps) => {
  const dispatch = useDispatch();
  const classes = profileModalStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [name, setName] = useState(user.name);
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  useEffect(() => {
    setName(user.name);
    setPhotoUrl(user.photoURL);
  }, [user]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  function imageClick() {
    const element = document.getElementById(FILE_UPLOAD_EL);
    if (element) {
      element.click();
    }
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = e.target.files;
    const filetype = filelist ? filelist[0].type.substring(0, 5) : 'error';
    if (filetype === 'image') {
      uploadPhotoToFirestore(e, user.uid).then((link) => {
        setPhotoUrl(link);
      });
    } else {
      dispatch(setNetworkError('Invalid Picture Format'));
      setPhotoUrl(user.photoURL);
      e.target.value = '';
    }
  };

  function handleSaveChanges() {
    const newUser = {
      name: name.trim(),
      photoURL: photoUrl,
    };

    dispatch(updateUser(newUser));

    handleClose();
  }

  function handleClose() {
    setName(user.name);
    setPhotoUrl(user.photoURL);
    props.handleClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
    >
      <IconButton className={classes.closeButton} onClick={handleClose} color="secondary">
        <CloseIcon />
      </IconButton>
      <Input
        id={FILE_UPLOAD_EL}
        type="file"
        onChange={handlePictureChange}
        style={{ display: 'none' }}
        inputProps={{ accept: 'image/*' }}
      />
      <Container maxWidth="lg">
        <DialogTitle>
          <Typography className={classes.title} variant="h6" component="span" display="block">
            Profile
          </Typography>
        </DialogTitle>
        <Grid container={true} direction="column" justify="center" alignItems="center">
          <Grid item={true} className={classes.gridItem}>
            <Avatar
              alt={name}
              src={photoUrl}
              className={classes.avatarPicture}
              onClick={imageClick}
            />
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Name</InputLabel>
              <OutlinedInput value={name} onChange={handleNameChange} label="Name" />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Email</InputLabel>
              <OutlinedInput value={user.email} label="Email" disabled={true} />
            </FormControl>
          </Grid>
        </Grid>
        <DialogActions className={classes.actions}>
          <Button
            onClick={handleSaveChanges}
            color="secondary"
            variant="contained"
            className={classes.submit}
          >
            Save
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
};

export default ProfileModal;
