import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Grid,
  CardMedia,
  IconButton,
  Container,
  Checkbox,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { EventModel, UserEventModel } from 'redux/models/EventModel';
import moment from 'moment-timezone';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import { eventModalStyles } from './EventModal.styles';
import { clearSelectedEventAction } from '../../redux/actions/EventsActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { updateEvent } from '../../lib/EventRequests';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const EventModal = (): JSX.Element => {
  const dispatch = useDispatch();

  const classes = eventModalStyles();

  const eventId = useSelector((state: ReduxState) => {
    return state.events.selectedEvent;
  });

  const event: EventModel | UserEventModel = useSelector((state: ReduxState) => {
    let rv: EventModel | UserEventModel | undefined;

    if (eventId) {
      if (state.events.userEvents.has(eventId)) {
        rv = state.events.userEvents.get(eventId);
      } else if (state.events.events.has(eventId)) {
        rv = state.events.events.get(eventId);
      } else {
        dispatch(clearSelectedEventAction());
      }
    }

    return rv ? rv : new EventModel();
  });

  const allEventCategories = useSelector((state: ReduxState) => {
    return state.appState.categoriesArray;
  });

  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(0);
  const [eventStatus, setEventStatus] = useState(0);
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (eventId) {
      setEventTitle(event.name);
      setDescription(event.desc);
      setEventType(event.type);
      setEventStatus(event.status);
      setStartDate(event.start);
      setEndDate(event.end);
      setLocation(event.address);
      setCategories(event.category);
      setAmount(event.fee);
      setCapacity(event.capacity);
      setPhotoURL(event.photoURL);

      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [eventId, event]);

  // Used for Select Component label
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    if (inputLabel && inputLabel.current) {
      setLabelWidth(inputLabel.current.offsetWidth);
    }
  }, []);

  function closeEventModal() {
    dispatch(clearSelectedEventAction());
  }

  function handleTabChange(e: ChangeEvent<{}>, newValue: number) {
    setTabIndex(newValue);
  }

  function handleSubmit() {
    const updatedData = {
      eid: eventId,
      status: eventStatus,

      name: eventTitle,
      address: location,
      category: categories,
      photoURL: photoURL,
      desc: description,
      start: startDate,
      end: endDate,
      fee: amount,
      type: eventType,
      capacity: capacity,
    };

    dispatch(updateEvent(updatedData));
  }

  return (
    <Dialog onClose={closeEventModal} open={isModalOpen} maxWidth="md" fullWidth={true}>
      <CardMedia
        style={{ height: 200, flexBasis: 200 }}
        component="img"
        alt={eventTitle}
        image={photoURL}
        title={eventTitle}
      />
      <Grid container>
        <Grid item xs>
          <Typography className={classes.title}>{eventTitle}</Typography>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton color={'secondary'} onClick={closeEventModal}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <AppBar position="static" color={'secondary'}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Description" />
          <Tab label="Participants" />
          {event instanceof UserEventModel && event.isUserHost() ? <Tab label="Owner" /> : null}
        </Tabs>
      </AppBar>
      <Container className={classes.container} maxWidth={'lg'}>
        <TabPanel value={tabIndex} index={0}>
          <Grid container direction="column" justify="flex-start" alignItems="stretch">
            <Grid item className={classes.gridItem}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Button
                    color={
                      event instanceof UserEventModel && event.isUserYes() ? 'primary' : 'secondary'
                    }
                    variant={'contained'}
                    fullWidth
                  >
                    Going
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    color={
                      event instanceof UserEventModel && event.isUserMaybe()
                        ? 'primary'
                        : 'secondary'
                    }
                    variant={'contained'}
                    fullWidth
                  >
                    Maybe
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    color={
                      event instanceof UserEventModel && event.isUserNo() ? 'primary' : 'secondary'
                    }
                    variant={'contained'}
                    fullWidth
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.gridItem}>
              <TextField
                variant={'outlined'}
                value={description}
                onChange={(changeEvent) => {
                  setDescription(changeEvent.target.value);
                }}
                label="Description"
                fullWidth
                multiline
                disabled={!(event instanceof UserEventModel && event.isUserHost())}
              />
            </Grid>

            <Grid item className={classes.gridItem}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  style={{ marginRight: 20 }}
                  inputVariant="outlined"
                  value={moment(startDate)}
                  onChange={(date) => {
                    setStartDate(date ? date.valueOf() : moment().valueOf());
                  }}
                  label="Start"
                  showTodayButton
                  disabled={!(event instanceof UserEventModel && event.isUserHost())}
                />

                <DateTimePicker
                  inputVariant="outlined"
                  value={moment(endDate)}
                  onChange={(date) => {
                    setEndDate(date ? date.valueOf() : moment().valueOf());
                  }}
                  label="End"
                  showTodayButton
                  disabled={!(event instanceof UserEventModel && event.isUserHost())}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item className={classes.gridItem}>
              <Grid item>
                <TextField
                  variant={'outlined'}
                  type="number"
                  value={amount} // TODO: Make value "Free" if 0}
                  onChange={(changeEvent) => {
                    setAmount(parseInt(changeEvent.target.value));
                  }}
                  label="Price"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  disabled={!(event instanceof UserEventModel && event.isUserHost())}
                />
              </Grid>
            </Grid>

            <Grid item className={classes.gridItem}>
              <TextField
                variant={'outlined'}
                value={location}
                onChange={(changeEvent) => {
                  setLocation(changeEvent.target.value);
                }}
                label="Location"
                disabled={!(event instanceof UserEventModel && event.isUserHost())}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item className={classes.gridItem}>
              <FormControl variant="outlined">
                {/* TOD0: Outline goes through Label name*/}
                <InputLabel ref={inputLabel}>Status</InputLabel>
                <Select
                  value={eventStatus}
                  onChange={(changeEvent) => {
                    setEventStatus(changeEvent.target.value as number);
                  }}
                  labelWidth={labelWidth}
                  disabled={!(event instanceof UserEventModel && event.isUserHost())}
                >
                  <MenuItem value={0}>Active</MenuItem>
                  <MenuItem value={1}>Postponed</MenuItem>
                  <MenuItem value={2}>Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item className={classes.gridItem}>
              <FormControl variant="outlined">
                {/* TOD0: Outline goes through Label name*/}
                <InputLabel ref={inputLabel}>Type</InputLabel>
                <Select
                  value={eventType}
                  onChange={(changeEvent) => {
                    setEventType(changeEvent.target.value as number);
                  }}
                  labelWidth={labelWidth}
                  disabled={!(event instanceof UserEventModel && event.isUserHost())}
                >
                  <MenuItem value={0}>Public</MenuItem>
                  <MenuItem value={1}>Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={allEventCategories}
                getOptionLabel={(option) => {
                  return option;
                }}
                value={categories}
                disabled={!(event instanceof UserEventModel && event.isUserHost())}
                renderOption={(option, { selected }) => {
                  return (
                    <React.Fragment>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </React.Fragment>
                  );
                }}
                renderInput={(params) => {
                  return <TextField {...params} variant={'outlined'} label="Categories" />;
                }}
                onChange={(changeEvent, value) => {
                  setCategories(value);
                }}
              />
            </Grid>

            <Grid item className={classes.gridItem}>
              <TextField
                variant={'outlined'}
                type={'number'}
                value={capacity}
                onChange={(changeEvent) => {
                  setCapacity(parseInt(changeEvent.target.value));
                }}
                label="Capacity"
                disabled={!(event instanceof UserEventModel && event.isUserHost())}
              />
            </Grid>

            <Grid item className={classes.gridItem}>
              <Typography>Comments</Typography>
              <TextField
                className={classes.commentField}
                multiline
                rows="4"
                variant="outlined"
                disabled
                style={{ width: '100%' }}
              />
              <Grid container>
                <Grid item xs>
                  <TextField
                    placeholder={'Leave a comment'}
                    variant={'outlined'}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={3} sm={2} md={1}>
                  <Button className={classes.sendButton} variant={'outlined'} fullWidth>
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {event instanceof UserEventModel && event.isUserHost() ? (
              <Grid item className={classes.gridItem}>
                <Button variant={'outlined'} onClick={handleSubmit}>
                  Update Event
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Typography>Participants</Typography>
        </TabPanel>
        {event instanceof UserEventModel && event.isUserHost() ? (
          <TabPanel value={tabIndex} index={2}>
            <Typography>Owner</Typography>
          </TabPanel>
        ) : null}
      </Container>
    </Dialog>
  );
};
