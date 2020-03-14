import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

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
  });
});

export default function CreateEvent(props: CreateEventProps) {
  const classes = profileStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const options = [{ value: 'Concert' }, { value: 'strawberry' }, { value: 'vanilla' }];
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.openCreateEvent}
      maxWidth="sm"
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  style={{ marginRight: 20 }}
                  inputVariant="outlined"
                  value={startDate}
                  disablePast
                  onChange={(date) => {}}
                  label="Start"
                  showTodayButton
                />

                <DateTimePicker
                  inputVariant="outlined"
                  value={endDate}
                  disablePast
                  onChange={(date) => {}}
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
                  value={name}
                  onChange={handleNameChange}
                  label="Location"
                  fullWidth
                />
              </FormControl>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <TextField
                fullWidth
                select
                label="Category"
                value={() => {}}
                onChange={() => {}}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
              >
                {options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  );
                })}
              </TextField>
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <InputLabel htmlFor="standard-adornment-amount">Upload Picture</InputLabel>
              <Input disableUnderline type="file" />
            </Grid>

            <Grid item={true} className={classes.gridItem}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="component-outlined">Amount</InputLabel>
                <OutlinedInput
                  id="component-outlined-name"
                  value={name}
                  onChange={handleNameChange}
                  label="Amount"
                  fullWidth
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item={true} className={classes.gridItem}>
            <DialogActions>
              <Button autoFocus onClick={props.handleClose} color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}
