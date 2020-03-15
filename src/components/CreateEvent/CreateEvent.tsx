import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
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

type CreateEventProps = {
  openCreateEvent: boolean;
  handleClose: () => void;
};

export const profileStyles = makeStyles((theme: Theme) => {
  return createStyles({
    avatarPicture: {
      height: '200px',
      width: '200px',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    gridItem: {
      padding: '12px',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  });
});

export default function CreateEvent(props: CreateEventProps) {
  const classes = profileStyles();
  const emptyArray: string[] = [];
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(0);
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState(emptyArray);
  const [eventPicture, setEventPicture] = useState('');
  const [amount, setAmount] = useState('');
  const [capacity, setCapacity] = useState(0);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const allEventTypes = [
    { label: 'Public', value: 0 },
    { label: 'Private', value: 1 },
  ];

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

  const handleEventTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventType(parseInt(event.target.value));
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt(event.target.value));
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventPicture(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const allEventCategories = useSelector((state: ReduxState) => {
    return state.appState.categoriesArray;
  });

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.openCreateEvent}
      maxWidth="md"
      fullWidth={true}
    >
      <Container maxWidth="lg">
        <Grid container={true} direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogTitle id="customized-dialog-title">
              <Typography variant="h6">Create Event</Typography>
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

          <Grid container={true} direction="column" justify="flex-start" alignItems="stretch">
            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                  id="component-outlined-name"
                  value={name}
                  onChange={handleNameChange}
                  label="Name"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Description</InputLabel>
                <OutlinedInput
                  id="component-outlined-name"
                  value={description}
                  onChange={handleDescriptionChange}
                  label="Description"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <TextField
                fullWidth
                select
                label="Event Type"
                value={eventType}
                onChange={handleEventTypeChange}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                {allEventTypes.map((option) => {
                  return (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </TextField>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Max Capacity</InputLabel>
                <OutlinedInput
                  type="number"
                  id="component-outlined-name"
                  value={capacity}
                  onChange={handleCapacityChange}
                  label="Max Capacity"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  style={{ marginRight: 20 }}
                  inputVariant="outlined"
                  value={moment(startDate)}
                  disablePast
                  onChange={(date) => {
                    setStartDate(date ? date.valueOf() : moment().valueOf());
                  }}
                  label="Start"
                  showTodayButton
                />

                <DateTimePicker
                  inputVariant="outlined"
                  value={moment(endDate)}
                  disablePast
                  onChange={(date) => {
                    setEndDate(date ? date.valueOf() : moment().valueOf());
                  }}
                  label="End"
                  showTodayButton
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Location</InputLabel>
                <OutlinedInput
                  id="component-outlined-name"
                  value={location}
                  onChange={handleLocationChange}
                  label="Location"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="tags-standard"
                options={allEventCategories}
                getOptionLabel={(option) => {
                  return option;
                }}
                renderOption={(option, { selected }) => {
                  return (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </React.Fragment>
                  );
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Categories"
                      placeholder="Categories"
                    />
                  );
                }}
                onChange={(event, value) => {
                  handleCategoryChange(value);
                }}
              />
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <InputLabel htmlFor="standard-adornment-amount">Upload Event Picture</InputLabel>
              <Input
                disableUnderline
                type="file"
                onChange={(event) => {
                  console.log(event.target.value);
                }}
              />
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Amount</InputLabel>
                <OutlinedInput
                  type="number"
                  id="component-outlined-name"
                  value={amount}
                  onChange={handleAmountChange}
                  label="Amount"
                  fullWidth
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item={true} className={classes.gridItem}>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => {
                  console.log(endDate);
                }}
                color="primary"
                variant="contained"
              >
                Create Event
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}
