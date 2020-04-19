import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Button,
  Avatar,
  ListItemIcon,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EventIcon from '@material-ui/icons/Event';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ManageEventIcon from '@material-ui/icons/EventNote';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { ReactComponent as GoogleLogo } from 'assets/google.svg';
import { getAuth, makeLoginPopup } from 'lib/Firebase';
import { isSmallDown } from 'lib/UseBreakPoints';
import { navbarStyles } from './NavBar.styles';
import { setRouteAction, setSearching, setSearchTermAction } from 'redux/actions/AppStateActions';
import { HOMEPAGE, MANAGE_EVENTS } from 'redux/models/AppStateModel';
import ProfileModal from '../ProfileModal/ProfileModal';
import CreateEvent from '../CreateEvent/CreateEvent';
import NotificationModal from '../NotificationsModal/NotificationsModal';

const Navbar = (): JSX.Element => {
  const classes = navbarStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const isSmall = isSmallDown();

  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const searchTerm = useSelector((state: ReduxState) => {
    return state.appState.searchTerm;
  });

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function signIn() {
    makeLoginPopup().then();
  }

  function openCreateEventModal() {
    handleClose();
    setOpenCreateEvent(true);
  }

  function closeCreateEventModal() {
    setOpenCreateEvent(false);
  }

  function openProfileModal() {
    handleClose();
    setOpenProfile(true);
  }

  function closeProfileModal() {
    setOpenProfile(false);
  }

  function openNotificationsModal() {
    handleClose();
    setOpenNotifications(true);
  }

  function closeNotificationsModal() {
    setOpenNotifications(false);
  }

  function manageEventsClick() {
    handleClose();
    dispatch(setRouteAction(MANAGE_EVENTS));
  }

  function logout() {
    handleClose();
    getAuth().signOut().then();
  }

  function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchTermAction(event.target.value));
  }

  function homePageClick() {
    dispatch(setRouteAction(HOMEPAGE));
  }

  function getEndComponents() {
    if (user.uid.length > 0) {
      return (
        <div className={classes.end}>
          {isSmall ? (
            <IconButton
              color="secondary"
              className={classes.smallEvent}
              onClick={openCreateEventModal}
            >
              <EventIcon />
            </IconButton>
          ) : (
            <Button
              color="secondary"
              size="large"
              onClick={openCreateEventModal}
              startIcon={<EventIcon />}
            >
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
            <IconButton onClick={signIn}>
              <GoogleLogo />
            </IconButton>
          ) : (
            <Button color="secondary" size="large" startIcon={<GoogleLogo />} onClick={signIn}>
              Login
            </Button>
          )}
        </div>
      );
    }
  }

  return (
    <AppBar position="static">
      <CreateEvent openCreateEvent={openCreateEvent} handleClose={closeCreateEventModal} />
      <ProfileModal open={openProfile} handleClose={closeProfileModal} />
      <NotificationModal open={openNotifications} handleClose={closeNotificationsModal} />

      <Toolbar className={classes.navBar}>
        <Typography className={classes.title} variant="h6" noWrap={true} onClick={homePageClick}>
          Eventica
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon color="secondary" />
          </div>
          <InputBase
            value={searchTerm}
            onChange={updateSearch}
            placeholder="search events..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onFocus={() => {
              dispatch(setSearching(true));
            }}
          />
        </div>
        {getEndComponents()}
        <Menu
          className={classes.menuList}
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
          <MenuItem onClick={openProfileModal}>
            <ListItemIcon className={classes.listIcon}>
              <ProfileIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <Typography>Profile</Typography>
          </MenuItem>

          <MenuItem onClick={openNotificationsModal}>
            <ListItemIcon className={classes.listIcon}>
              <NotificationsNoneIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <Typography>Notifications</Typography>
          </MenuItem>

          <MenuItem onClick={manageEventsClick}>
            <ListItemIcon className={classes.listIcon}>
              <ManageEventIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <Typography>Manage Events</Typography>
          </MenuItem>

          <MenuItem onClick={logout}>
            <ListItemIcon className={classes.listIcon}>
              <LogoutIcon color="secondary" fontSize="small" />
            </ListItemIcon>
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
