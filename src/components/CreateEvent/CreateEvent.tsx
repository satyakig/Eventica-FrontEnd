import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Dialog,
  Input,
  Typography,
  InputAdornment,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { v4 } from 'uuid';
import { getStorage } from 'lib/Firebase';
import { CreateEventType, createEvent } from 'lib/EventRequests';
import { EVENT_TYPE_LABELS, getEventType } from 'redux/models/EventModel';
import { isValidEvent } from 'validation/EventValidation';
import { createEventStyles } from './CreateEvent.styles';

const EVENT_TIME_FORMAT = 'MMM D, h:mm a';

type CreateEventProps = {
  openCreateEvent: boolean;
  handleClose: () => void;
};

export default function CreateEvent(props: CreateEventProps) {
  const classes = createEventStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(EVENT_TYPE_LABELS[0]);
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [photoURL, setPhotoURL] = useState('');
  const [validEvent, setValidEvent] = useState(false);

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  useEffect(() => {
    const data: CreateEventType = {
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

    setValidEvent(isValidEvent(data));
  }, [
    name,
    description,
    eventType,
    startDate,
    endDate,
    location,
    categories,
    amount,
    capacity,
    photoURL,
  ]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleCategoryChange = (values: string[]) => {
    setCategories(values);
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt(event.target.value));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };

  const allEventCategories = useSelector((state: ReduxState) => {
    return state.appState.categoriesArray;
  });

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

  const onSubmit = () => {
    const data: CreateEventType = {
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

    dispatch(createEvent(data));
    props.handleClose();
  };

  return (
    <Dialog
      className={classes.dialog}
      open={props.openCreateEvent}
      onClose={props.handleClose}
      fullWidth={true}
      disableBackdropClick={true}
      disableEscapeKeyDown={false}
    >
      <IconButton className={classes.closeButton} onClick={props.handleClose} color="secondary">
        <CloseIcon />
      </IconButton>
      <Container maxWidth="lg">
        <DialogTitle>
          <Typography className={classes.title} variant="h6" component="span" display="block">
            Create Event
          </Typography>
        </DialogTitle>
        <Grid className={classes.grid} container={true} spacing={2}>
          <Grid item={true} xs={12}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={name}
                onChange={handleNameChange}
                label="Name"
                fullWidth={true}
                multiline={true}
              />
            </FormControl>
          </Grid>

          <Grid item={true} xs={12}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel>Description</InputLabel>
              <OutlinedInput
                value={description}
                onChange={handleDescriptionChange}
                label="Description"
                fullWidth={true}
                multiline={true}
              />
            </FormControl>
          </Grid>

          <Grid item={true} xs={12}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel>Location</InputLabel>
              <OutlinedInput
                value={location}
                onChange={handleLocationChange}
                label="Location"
                fullWidth={true}
                multiline={true}
              />
            </FormControl>
          </Grid>

          <Grid item={true} xs={6}>
            <Autocomplete
              multiple={false}
              disableCloseOnSelect={false}
              value={eventType}
              disableClearable={true}
              options={EVENT_TYPE_LABELS}
              renderOption={(option, { selected }) => {
                return (
                  <Fragment>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" color="secondary" />}
                      checked={selected}
                    />
                    {option}
                  </Fragment>
                );
              }}
              renderInput={(params) => {
                return <TextField {...params} variant="outlined" label="Type" />;
              }}
              onChange={(event, value) => {
                if (value) {
                  setEventType(value);
                }
              }}
            />
          </Grid>

          <Grid item={true} xs={6}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel>Max Capacity</InputLabel>
              <OutlinedInput
                type="number"
                value={capacity}
                onChange={handleCapacityChange}
                label="Max Capacity"
                fullWidth={true}
              />
            </FormControl>
          </Grid>

          <Grid item={true} xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                format={EVENT_TIME_FORMAT}
                inputVariant="outlined"
                value={moment(startDate)}
                disablePast={true}
                onChange={(date) => {
                  setStartDate(date ? date.valueOf() : moment().valueOf());
                }}
                label="Start Time"
                showTodayButton={true}
                fullWidth={true}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item={true} xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                format={EVENT_TIME_FORMAT}
                inputVariant="outlined"
                value={moment(endDate)}
                disablePast={true}
                onChange={(date) => {
                  setEndDate(date ? date.valueOf() : moment().valueOf());
                }}
                label="End Time"
                showTodayButton={true}
                fullWidth={true}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item={true} xs={6}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel>Amount</InputLabel>
              <OutlinedInput
                type="number"
                value={amount}
                onChange={handleAmountChange}
                label="Amount"
                fullWidth={true}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
          </Grid>

          <Grid item={true} xs={6}>
            <InputLabel>Upload Event Picture</InputLabel>
            <Input
              className={classes.upload}
              disableUnderline={true}
              type="file"
              onChange={handlePictureChange}
              fullWidth={true}
            />
          </Grid>

          <Grid item={true} xs={12}>
            <Autocomplete
              multiple={true}
              disableCloseOnSelect={true}
              value={categories}
              options={allEventCategories}
              renderOption={(option, { selected }) => {
                return (
                  <Fragment>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" color="secondary" />}
                      checked={selected}
                    />
                    {option}
                  </Fragment>
                );
              }}
              renderInput={(params) => {
                return <TextField {...params} variant="outlined" label="Categories" />;
              }}
              onChange={(event, value) => {
                handleCategoryChange(value);
              }}
            />
          </Grid>
        </Grid>

        <DialogActions className={classes.actions}>
          <Button
            disabled={!validEvent}
            onClick={onSubmit}
            color="secondary"
            variant="contained"
            className={classes.submit}
          >
            Create Event
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
}
