import React, { ChangeEvent, useEffect, useState, Fragment } from 'react';
import {
  Dialog,
  Typography,
  Tabs,
  Tab,
  Grid,
  CardMedia,
  IconButton,
  Container,
  InputLabel,
  FormControl,
  Input,
  OutlinedInput,
} from '@material-ui/core';
import {
  EVENT_STATUS_LABELS,
  EVENT_TYPE_LABELS,
  EventModel,
  getEventStatus,
  getEventStatusLabel,
  getEventType,
  getEventTypeLabel,
  UserEventModel,
} from 'redux/models/EventModel';
import moment from 'moment-timezone';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { clearSelectedEventAction } from 'redux/actions/EventsActions';
import { ReduxState } from 'redux/combinedReducer';
import { updateEvent, UpdateEventType, CreateEventType } from 'lib/EventRequests';
import { useLoggedIn } from 'lib/useLoggedIn';
import { getStorage } from 'lib/Firebase';
import { isExtraSmallDown } from 'lib/useBreakPoints';
import { isValidEvent } from 'validation/EventValidation';
import EventDetails from './EventDetails';
import { eventModalStyles } from './EventModal.styles';

const FILE_UPLOAD_EL = 'FILE_UPLOAD_EL';

export const EventModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const loggedIn = useLoggedIn();

  const isXs = isExtraSmallDown();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const eventId = useSelector((state: ReduxState) => {
    return state.events.selectedEvent;
  });

  const event: EventModel | UserEventModel = useSelector((state: ReduxState) => {
    if (state.events.userEvents.get(eventId)) {
      return state.events.userEvents.get(eventId) as UserEventModel;
    }

    return state.events.events.get(eventId) as EventModel;
  });

  const [tabIndex, setTabIndex] = useState(0);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(EVENT_TYPE_LABELS[0]);
  const [eventStatus, setEventStatus] = useState(EVENT_STATUS_LABELS[2]);
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [photoURL, setPhotoURL] = useState('');
  const [validEventUpdate, setValidEventUpdate] = useState(false);

  function closeEventModal() {
    dispatch(clearSelectedEventAction());
  }

  function handleTabChange(e: ChangeEvent<{}>, newValue: number) {
    setTabIndex(newValue);
  }

  function imageClick() {
    const element = document.getElementById(FILE_UPLOAD_EL);
    if (isHost && element) {
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
        setPhotoURL(link);
      });
  };

  function handleSubmit() {
    const updatedData: UpdateEventType = {
      eid: eventId,
      status: getEventStatus(eventStatus),
      name: name.trim(),
      address: location.trim(),
      category: categories,
      photoURL: photoURL,
      desc: description.trim(),
      start: startDate,
      end: endDate,
      fee: amount,
      type: getEventType(eventType),
      capacity: capacity,
    };

    dispatch(updateEvent(updatedData));
  }

  useEffect(() => {
    if (eventId && event.eid) {
      setName(event.name);
      setDescription(event.desc);
      setEventType(getEventTypeLabel(event.type));
      setEventStatus(getEventStatusLabel(event.status));
      setStartDate(event.start);
      setEndDate(event.end);
      setLocation(event.address);
      setCategories(event.category);
      setAmount(event.fee);
      setCapacity(event.capacity);
      setPhotoURL(event.photoURL);
    }

    setTabIndex(0);
  }, [event, eventId]);

  useEffect(() => {
    const updatedData: CreateEventType = {
      name: name,
      address: location,
      category: categories,
      photoURL: photoURL,
      desc: description,
      start: startDate,
      end: endDate,
      fee: amount,
      type: getEventType(eventType),
      capacity: capacity,
    };

    setValidEventUpdate(isValidEvent(updatedData));
  }, [
    name,
    location,
    categories,
    photoURL,
    description,
    startDate,
    endDate,
    amount,
    eventType,
    capacity,
  ]);

  const partOfEvent = loggedIn && event instanceof UserEventModel;
  const isHost = partOfEvent && (event as UserEventModel).isUserHost();
  const attending = partOfEvent && (event as UserEventModel).isUserYes();
  const maybe = partOfEvent && (event as UserEventModel).isUserMaybe();
  const no = partOfEvent && (event as UserEventModel).isUserNo();
  const invited = partOfEvent && (event as UserEventModel).isUserInvited();

  const classes = eventModalStyles({ isHost });

  const childProps = {
    eventId,
    classes,
    partOfEvent,
    isHost,
    attending,
    maybe,
    no,
    invited,
    name,
    setName,
    description,
    setDescription,
    eventType,
    setEventType,
    eventStatus,
    setEventStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    categories,
    setCategories,
    amount,
    setAmount,
    capacity,
    setCapacity,
    photoURL,
    setPhotoURL,
    validEventUpdate,
    setValidEventUpdate,
    handleSubmit,
  };

  function getTab() {
    switch (tabIndex) {
      case 0: // Details
        return <EventDetails {...childProps} />;

      case 1: // Participants
        return (
          <Fragment>
            <span>Participants</span>
          </Fragment>
        );

      case 2: // Chat
        return (
          <Fragment>
            <span>Chat</span>
          </Fragment>
        );

      case 3: // Owner
        return (
          <Fragment>
            <span>Owner</span>
          </Fragment>
        );

      default:
        return <div />;
    }
  }

  if (!eventId) {
    return <div />;
  }

  return (
    <Dialog
      className={classes.dialog}
      open={true}
      onClose={closeEventModal}
      fullWidth={true}
      disableBackdropClick={true}
      disableEscapeKeyDown={false}
    >
      <IconButton className={classes.closeButton} onClick={closeEventModal} color="secondary">
        <CloseIcon />
      </IconButton>
      {isHost ? (
        <Input
          id={FILE_UPLOAD_EL}
          type="file"
          onChange={handlePictureChange}
          style={{ display: 'none' }}
        />
      ) : null}
      <CardMedia
        className={classes.image}
        component="img"
        alt={name}
        image={photoURL}
        title={name}
        onClick={imageClick}
      />
      <Container maxWidth="xl">
        <Grid container={true} spacing={1} className={classes.topGrid}>
          <Grid item={true} xs={12}>
            {isHost ? (
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  value={name}
                  onChange={(changeEvent) => {
                    setName(changeEvent.target.value);
                  }}
                  label="Name"
                  fullWidth={true}
                  multiline={true}
                />
              </FormControl>
            ) : (
              <Typography variant="h5" className={classes.typographyTitle}>
                {name}
              </Typography>
            )}
          </Grid>

          <Grid item={true} xs={12}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              className={classes.tabs}
              variant="scrollable"
              indicatorColor="primary"
              textColor="secondary"
              scrollButtons={isXs ? 'on' : 'auto'}
            >
              <Tab label="Details" />
              <Tab label="Participants" />
              <Tab label="Chat" />
              {isHost ? <Tab label="Owner" /> : null}
            </Tabs>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <Grid container={true} spacing={2} className={classes.bottomGrid}>
          {getTab()}
        </Grid>
      </Container>
    </Dialog>
  );
};
