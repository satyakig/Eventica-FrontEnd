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
import { ReduxState } from '../../redux/combinedReducer';

interface ProfileProps {
  open: boolean;
  handleClose: () => void;
}

const Profile = (props: ProfileProps) => {
  const user = useSelector((state: ReduxState) => {
    return state.user;
  });
  const classes = profileStyles();

  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [phone, setPhone] = React.useState(user.phone);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user.name, user.email, user.phone]);

  const nameInput = React.createRef();
  const emailInput = React.createRef();
  const phoneInput = React.createRef();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  function handleSaveChanges() {
    // Read values
    // @ts-ignore
    console.log(nameInput.current.value);
    // @ts-ignore
    console.log(emailInput.current.value);
    // @ts-ignore
    console.log(phoneInput.current.value);

    // Check if input changed, if not, do props.handleClose()
    // Validate input
    // Send to API to update Firebase
    props.handleClose();
  }

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
      <Container maxWidth="lg">
        <Grid container={true} direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogTitle id="customized-dialog-title">
              <Typography variant="h6">Profile</Typography>
              {props.handleClose ? (
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={props.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <Avatar alt={user.name} src={user.photoURL} className={classes.avatarPicture} />
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput
                id="component-outlined-name"
                value={name}
                onChange={handleNameChange}
                label="Name"
                inputRef={nameInput}
              />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Email</InputLabel>
              <OutlinedInput
                id="component-outlined-email"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                inputRef={emailInput}
              />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Phone</InputLabel>
              <OutlinedInput
                id="component-outlined-phone"
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
