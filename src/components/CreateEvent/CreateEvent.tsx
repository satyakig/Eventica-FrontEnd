import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { createEventStyles } from './CreateEvent.styles';

type CreateEventProps = {
  openCreateEvent: boolean;
  handleClose: () => void;
};

export default function CreateEvent(props: CreateEventProps) {
  const classes = createEventStyles();
  const emptyArray: string[] = [];
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(0);
  const [startDate, setStartDate] = useState(moment().valueOf());
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState(emptyArray);
  const [amount, setAmount] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [photoURL, setPhotoURL] = useState('');

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

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

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
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

  return (
    <Dialog
      open={props.openCreateEvent}
      onClose={props.handleClose}
      fullWidth={true}
      disableBackdropClick={true}
      disableEscapeKeyDown={false}
    >
      <Container maxWidth="lg">
        <Grid container={true} direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogTitle>
              <Typography className={classes.title} variant="h6" component="span">
                Create Event
              </Typography>
              <IconButton
                className={classes.closeButton}
                onClick={props.handleClose}
                color="secondary"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
          </Grid>

          <Grid container={true} direction="column" justify="flex-start" alignItems="stretch">
            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Name</InputLabel>
                <OutlinedInput value={name} onChange={handleNameChange} label="Name" fullWidth />
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Description</InputLabel>
                <OutlinedInput
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
                <InputLabel>Max Capacity</InputLabel>
                <OutlinedInput
                  type="number"
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
                <InputLabel>Location</InputLabel>
                <OutlinedInput
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
              <InputLabel>Upload Event Picture</InputLabel>
              <Input disableUnderline type="file" onChange={handlePictureChange} />
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Amount</InputLabel>
                <OutlinedInput
                  type="number"
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
              <Button autoFocus onClick={props.handleClose} color="secondary" variant="contained">
                Create Event
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}
