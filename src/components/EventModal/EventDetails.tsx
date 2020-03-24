import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import QRCode from 'qrcode.react';
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
  USER_EVENT_STATUS,
  USER_EVENT_STATUS_LABELS,
} from 'redux/models/EventModel';
import { updateUserEvent } from 'lib/EventCommentRequests';
import { useLoggedIn } from 'lib/useLoggedIn';
import { isSuperExtraSmallDown } from 'lib/useBreakPoints';
import { ReduxState } from 'redux/combinedReducer';
import CheckoutDialog from '../Checkout/Checkout';

const EVENT_TIME_FORMAT = 'MMM D YYYY, h:mm a';
const SMALL_FORMAT = 'D/MM/YYYY H:m';

const EventDetails = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const loggedIn = useLoggedIn();
  const isSXs = isSuperExtraSmallDown();

  const allEventCategories = useSelector((state: ReduxState) => {
    return state.appState.categoriesArray;
  });

  const [openPayment, setOpenPayment] = useState(false);

  const {
    classes,
    user,
    eventId,
    isHost,
    attending,
    maybe,
    no,
    paid,
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
    validEventUpdate,
    handleSubmit,
    pastEndDate,
  } = props;

  function processPaymentClose(status: boolean) {
    if (status) {
      dispatch(
        updateUserEvent({
          eid: eventId,
          status: USER_EVENT_STATUS.ATTENDING,
        }),
      );
    }

    setOpenPayment(false);
  }

  function attendingClick() {
    if (!attending && !pastEndDate) {
      if (amount > 0 && !paid) {
        setOpenPayment(true);
      } else {
        dispatch(
          updateUserEvent({
            eid: eventId,
            status: USER_EVENT_STATUS.ATTENDING,
          }),
        );
      }
    }
  }

  function maybeClick() {
    if (!maybe && !pastEndDate) {
      dispatch(
        updateUserEvent({
          eid: eventId,
          status: USER_EVENT_STATUS.MAYBE,
        }),
      );
    }
  }

  function noClick() {
    if (!no && !pastEndDate) {
      dispatch(
        updateUserEvent({
          eid: eventId,
          status: USER_EVENT_STATUS.NO,
        }),
      );
    }
  }

  return (
    <Fragment>
      <CheckoutDialog open={openPayment} handleClose={processPaymentClose} amount={amount} />
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
            disabled={!isHost || pastEndDate}
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
            disabled={!isHost || pastEndDate}
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
          disabled={!isHost || pastEndDate}
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
          disabled={!isHost || pastEndDate}
        />
      </Grid>

      <Grid item={true} xs={6}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            format={isSXs ? SMALL_FORMAT : EVENT_TIME_FORMAT}
            className={classes.commonInputStyles}
            inputVariant="outlined"
            value={moment(startDate)}
            onChange={(date) => {
              setStartDate(date ? date.valueOf() : moment().valueOf());
            }}
            label="Start Time"
            showTodayButton={true}
            disabled={!isHost || pastEndDate}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item={true} xs={6}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            format={isSXs ? SMALL_FORMAT : EVENT_TIME_FORMAT}
            className={classes.commonInputStyles}
            inputVariant="outlined"
            value={moment(endDate)}
            onChange={(date) => {
              setEndDate(date ? date.valueOf() : moment().valueOf());
            }}
            label="End Time"
            showTodayButton={true}
            disabled={!isHost || pastEndDate}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Fee</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            type="number"
            value={amount} // TODO: Make value "Free" if 0
            onChange={(changeEvent) => {
              if (changeEvent.target.value) {
                setAmount(Number(changeEvent.target.value));
              } else {
                setAmount(Number.NaN);
              }
            }}
            label="Fee"
            fullWidth={true}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            disabled={!isHost || pastEndDate}
          />
        </FormControl>
      </Grid>

      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Capacity</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            type="number"
            value={capacity}
            onChange={(changeEvent) => {
              setCapacity(parseInt(changeEvent.target.value));
            }}
            label="Capacity"
            disabled={!isHost || pastEndDate}
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
          disabled={!isHost || pastEndDate}
        />
      </Grid>

      {loggedIn && !isHost ? (
        <Fragment>
          <Grid item={true} xs={4}>
            <Button
              className={classes.userEventButtons}
              color={attending ? 'primary' : 'secondary'}
              onClick={attendingClick}
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
              onClick={maybeClick}
              variant="outlined"
              fullWidth={true}
            >
              {USER_EVENT_STATUS_LABELS[2]}
            </Button>
          </Grid>

          <Grid item={true} xs={4}>
            <Button
              className={classes.userEventButtons}
              color={no ? 'primary' : 'secondary'}
              onClick={noClick}
              variant="outlined"
              fullWidth={true}
            >
              {USER_EVENT_STATUS_LABELS[3]}
            </Button>
          </Grid>
        </Fragment>
      ) : null}

      {isHost ? (
        <Grid item={true} xs={12} className={classes.updateButton}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={!validEventUpdate || pastEndDate}
          >
            Update Event
          </Button>
        </Grid>
      ) : null}

      {!isHost && (attending || maybe) ? (
        <Grid container={true} item={true} xs={12} justify="center">
          <QRCode
            renderAs="svg"
            value={JSON.stringify({
              uid: user.uid,
              eventId: eventId,
              attending: attending,
              maybe: maybe,
            })}
          />
        </Grid>
      ) : null}
    </Fragment>
  );
};

export default EventDetails;
