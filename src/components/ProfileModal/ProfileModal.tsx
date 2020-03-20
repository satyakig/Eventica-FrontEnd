import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { profileModalStyles } from './ProfileModal.styles';
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
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { patchRequest, PATHS } from '../../lib/HttpRequest';
import { v4 } from 'uuid';
import { getStorage } from '../../lib/Firebase';

const FILE_UPLOAD_EL = 'FILE_UPLOAD_EL';

interface ProfileProps {
  open: boolean;
  handleClose: () => void;
}

const ProfileModal = (props: ProfileProps) => {
  const classes = profileModalStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
    setPhotoUrl(user.photoURL);
  }, [user]);

  const nameInput = React.createRef<string>();
  const phoneInput = React.createRef<string>();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  function imageClick() {
    const element = document.getElementById(FILE_UPLOAD_EL);
    if (element) {
      element.click();
    }
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setPhotoUrl(link);
      });
  };

  function handleSaveChanges() {
    const oldUser = {
      name: user.name,
      phone: user.phone,
      photoURL: user.photoURL,
    };

    const newUser = {
      // @ts-ignore
      name: nameInput.current.value,
      // @ts-ignore
      phone: phoneInput.current.value,
      photoURL: photoUrl,
    };
    console.log(JSON.stringify(oldUser));
    console.log(JSON.stringify(newUser));
    console.log(JSON.stringify(oldUser) !== JSON.stringify(newUser));

    if (JSON.stringify(oldUser) !== JSON.stringify(newUser)) {
      console.log('Updating user');
      patchRequest(PATHS.USER, newUser);
    }
    handleClose();
  }

  function handleClose() {
    setName(user.name);
    setPhone(user.phone);
    setPhotoUrl(user.photoURL);
    props.handleClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
    >
      <IconButton className={classes.closeButton} onClick={props.handleClose} color="secondary">
        <CloseIcon />
      </IconButton>
      <Input
        id={FILE_UPLOAD_EL}
        type="file"
        onChange={handlePictureChange}
        style={{ display: 'none' }}
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
              <OutlinedInput
                value={name}
                onChange={handleNameChange}
                label="Name"
                inputRef={nameInput}
              />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Email</InputLabel>
              <OutlinedInput value={user.email} label="Email" disabled={true} />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Phone</InputLabel>
              <OutlinedInput
                value={phone}
                onChange={handlePhoneChange}
                label="Phone"
                inputRef={phoneInput}
              />
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
