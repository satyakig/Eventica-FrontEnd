import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { dialogActionsStyles, dialogTitleStyles } from './Profile.styles';
import { Avatar, FormControl, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';

export interface DialogTitleProps extends WithStyles {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(dialogTitleStyles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles(dialogActionsStyles)(MuiDialogActions);

interface ProfileProps {
  open: boolean;
  handleClose: () => void;
}

const Profile = (props: ProfileProps) => {
  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

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
      <Grid container={true} direction="column" justify="center" alignItems="center">
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Profile
        </DialogTitle>
        <Avatar alt={user.name} src={user.photoURL} />
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
        <DialogActions>
          <Button autoFocus onClick={handleSaveChanges} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default Profile;
