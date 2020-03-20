import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {
  EVENT_STATUS_LABELS,
  EVENT_TYPE_LABELS,
  getUserEventStatus,
  USER_EVENT_STATUS_LABELS,
} from 'redux/models/EventModel';
import { updateUserEvent } from 'lib/EventCommentRequests';
import { useLoggedIn } from 'lib/useLoggedIn';
import { ReduxState } from 'redux/combinedReducer';

const EventDetails = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const loggedIn = useLoggedIn();

  const allEventCategories = useSelector((state: ReduxState) => {
    return state.appState.categoriesArray;
  });

  const {
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
    ...rest
  } = props;

  return (
    <Fragment>
      <Grid item={true} xs={12}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Description</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            value={description}
            onChange={(changeEvent) => {
              setDescription(changeEvent.target.value);
            }}
            label="Description"
            fullWidth={true}
            multiline={true}
            disabled={!isHost}
          />
        </FormControl>
      </Grid>

      <Grid item={true} xs={12}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Location</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            value={location}
            onChange={(changeEvent) => {
              setLocation(changeEvent.target.value);
            }}
            label="Location"
            fullWidth={true}
            disabled={!isHost}
            multiline={true}
          />
        </FormControl>
      </Grid>

      <Grid item={true} xs={6}>
        <Autocomplete
          className={classes.commonInputStyles}
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
          onChange={(e, value) => {
            if (value) {
              setEventType(value);
            }
          }}
          disabled={!isHost}
        />
      </Grid>

      <Grid item={true} xs={6}>
        <Autocomplete
          className={classes.commonInputStyles}
          multiple={false}
          disableCloseOnSelect={false}
          value={eventStatus}
          disableClearable={true}
          options={EVENT_STATUS_LABELS}
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
            return <TextField {...params} variant="outlined" label="Status" />;
          }}
          onChange={(e, value) => {
            if (value) {
              setEventStatus(value);
            }
          }}
          disabled={!isHost}
        />
      </Grid>

      <Grid item={true} xs={6}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            format="h:mm a MMM Do, YYYY"
            className={classes.commonInputStyles}
            inputVariant="outlined"
            value={moment(startDate)}
            onChange={(date) => {
              setStartDate(date ? date.valueOf() : moment().valueOf());
            }}
            label="Start Time"
            showTodayButton={true}
            disabled={!isHost}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item={true} xs={6}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            format="h:mm a MMM Do, YYYY"
            className={classes.commonInputStyles}
            inputVariant="outlined"
            value={moment(endDate)}
            onChange={(date) => {
              setEndDate(date ? date.valueOf() : moment().valueOf());
            }}
            label="End Time"
            showTodayButton={true}
            disabled={!isHost}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            type="number"
            value={amount} // TODO: Make value "Free" if 0
            onChange={(changeEvent) => {
              setAmount(parseInt(changeEvent.target.value));
            }}
            label="Amount"
            fullWidth={true}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            disabled={!isHost}
          />
        </FormControl>
      </Grid>

      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Max Capacity</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            type="number"
            value={capacity}
            onChange={(changeEvent) => {
              setCapacity(parseInt(changeEvent.target.value));
            }}
            label="Max Capacity"
            disabled={!isHost}
            fullWidth={true}
          />
        </FormControl>
      </Grid>

      <Grid item={true} xs={12}>
        <Autocomplete
          className={classes.commonInputStyles}
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
          onChange={(changeEvent, value) => {
            setCategories(value);
          }}
          disabled={!isHost}
        />
      </Grid>

      {loggedIn && !isHost ? (
        <Fragment>
          <Grid item={true} xs={4}>
            <Button
              className={classes.userEventButtons}
              color={attending ? 'primary' : 'secondary'}
              onClick={() => {
                dispatch(
                  updateUserEvent({
                    eid: eventId,
                    status: getUserEventStatus(USER_EVENT_STATUS_LABELS[1]),
                  }),
                );
              }}
              variant="outlined"
              fullWidth={true}
            >
              {USER_EVENT_STATUS_LABELS[1]}
            </Button>
          </Grid>

          <Grid item={true} xs={4}>
            <Button
              className={classes.userEventButtons}
              color={maybe ? 'primary' : 'secondary'}
              onClick={() => {
                dispatch(
                  updateUserEvent({
                    eid: eventId,
                    status: getUserEventStatus(USER_EVENT_STATUS_LABELS[2]),
                  }),
                );
              }}
              variant="outlined"
              fullWidth={true}
            >
              {USER_EVENT_STATUS_LABELS[2]}
            </Button>
          </Grid>

          <Grid item={true} xs={4}>
            <Button
              color={no ? 'primary' : 'secondary'}
              onClick={() => {
                dispatch(
                  updateUserEvent({
                    eid: eventId,
                    status: getUserEventStatus(USER_EVENT_STATUS_LABELS[3]),
                  }),
                );
              }}
              variant="outlined"
              fullWidth={true}
              className={classes.userEventButtons}
            >
              {USER_EVENT_STATUS_LABELS[3]}
            </Button>
          </Grid>
        </Fragment>
      ) : null}

      {isHost ? (
        <Grid item={true} xs={12} className={classes.updateButton}>
          <Button
            disabled={!validEventUpdate}
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Update Event
          </Button>
        </Grid>
      ) : null}
    </Fragment>
  );
};

export default EventDetails;
