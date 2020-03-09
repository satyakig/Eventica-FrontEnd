import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Button,
  useMediaQuery,
  Avatar,
  ListItemIcon,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EventIcon from '@material-ui/icons/Event';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ManageEventIcon from '@material-ui/icons/EventNote';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { ReactComponent as GoogleLogo } from 'assets/google.svg';
import { getAuth, makeLoginPopup } from 'lib/Firebase';
import { navbarStyles } from './NavBar.styles';

const useStyles = makeStyles(navbarStyles);

const Navbar = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmall = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('sm');
  });

  const user = useSelector((state: ReduxState) => {
    return state.userReducer;
  });

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function sigIn() {
    makeLoginPopup();
  }

  function createEvent() {
    console.debug('Create Event click');
  }

  function profileClick() {
    console.debug('Profile click');
    handleClose();
  }

  function manageEventsClick() {
    console.debug('Manage Events click');
    handleClose();
  }

  function logout() {
    getAuth()
      .signOut()
      .then();
    handleClose();
  }

  function getEndComponents() {
    if (user.uid.length > 0) {
      return (
        <div className={classes.end}>
          {isSmall ? (
            <IconButton className={classes.smallEvent} onClick={createEvent}>
              <EventIcon />
            </IconButton>
          ) : (
            <Button size="large" onClick={createEvent} startIcon={<EventIcon />}>
              Create
            </Button>
          )}
          <IconButton onClick={handleClick}>
            <Avatar alt={user.name} src={user.photoURL} className={classes.small} />
          </IconButton>
        </div>
      );
    } else {
      return (
        <div className={classes.end}>
          {isSmall ? (
            <IconButton onClick={sigIn}>
              <GoogleLogo />
            </IconButton>
          ) : (
            <Button color="default" size="large" startIcon={<GoogleLogo />} onClick={sigIn}>
              Login
            </Button>
          )}
        </div>
      );
    }
  }

  return (
    <AppBar position="static" color="default">
      <Toolbar className={classes.navBar}>
        <Typography className={classes.title} variant="h6" noWrap={true}>
          Eventica
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search Events…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {getEndComponents()}
        <Menu
          anchorEl={anchorEl}
          keepMounted={true}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={profileClick}>
            <ListItemIcon className={classes.listIcon}>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Profile</Typography>
          </MenuItem>
          <MenuItem onClick={manageEventsClick}>
            <ListItemIcon className={classes.listIcon}>
              <ManageEventIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Manage Events</Typography>
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon className={classes.listIcon}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
