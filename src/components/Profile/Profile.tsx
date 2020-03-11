import React from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { profileStyles } from './Profile.styles';
import { Avatar, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';

export interface DialogTitleProps extends WithStyles {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(profileStyles)((props: DialogTitleProps) => {
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

const DialogContent = withStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2),
    },
  };
})(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  };
})(MuiDialogActions);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setEmail(event.target.value);
    setPhone(event.target.value);
  };

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
      <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        Profile
      </DialogTitle>
      <Avatar alt={user.name} src={user.photoURL} />
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Email</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={email}
          onChange={handleChange}
          label="Email"
        />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Phone</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={phone}
          onChange={handleChange}
          label="Phone"
        />
      </FormControl>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Profile;
