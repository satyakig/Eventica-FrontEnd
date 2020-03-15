import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { profileStyles } from './Profile.styles';
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  DialogTitle,
  DialogActions,
  Container,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';

interface ProfileProps {
  open: boolean;
  handleClose: () => void;
}

const Profile = (props: ProfileProps) => {
  const classes = profileStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [name, setName] = React.useState(user.name);
  const [phone, setPhone] = React.useState(user.phone);

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
  }, [user]);

  const nameInput = React.createRef<string>();
  const phoneInput = React.createRef<string>();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  function handleSaveChanges() {
    // Read values
    // @ts-ignore
    console.log(nameInput.current.value);
    // @ts-ignore
    console.log(phoneInput.current.value);

    // Check if input changed, if not, do props.handleClose()
    // Validate input
    // Send to API to update Firebase
    props.handleClose();
  }

  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <Container maxWidth="lg">
        <Grid container={true} direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogTitle>
              <Typography className={classes.title} variant="h6" component="span">
                Profile
              </Typography>
              <IconButton
                className={classes.closeButton}
                onClick={props.handleClose}
                color="secondary"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <Avatar alt={user.name} src={user.photoURL} className={classes.avatarPicture} />
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
            <FormControl variant="outlined" className={classes.email}>
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
          <Grid item={true} className={classes.gridItem}>
            <DialogActions>
              <Button onClick={handleSaveChanges} color="secondary" variant="contained">
                Save changes
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default Profile;
