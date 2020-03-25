import React, { Fragment } from 'react';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { EventUserType, USER_EVENT_STATUS } from '../../redux/models/EventModel';

type EventOwnerProps = {
  eventUsers: EventUserType[];
  classes: any;
};

export default function EventOwner(props: EventOwnerProps) {
  const { classes, eventUsers } = props;

  const totalResponses = eventUsers.filter((user: EventUserType) => {
    return (
      user.status === USER_EVENT_STATUS.ATTENDING ||
      user.status === USER_EVENT_STATUS.MAYBE ||
      user.status === USER_EVENT_STATUS.NO
    );
  }).length;

  const totalRevenue = eventUsers
    .filter((user: EventUserType) => {
      return user.paid === true;
    })
    .reduce((accumulator: number, user: EventUserType) => {
      return accumulator + user.fee;
    }, 0);

  return (
    <Fragment>
      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Total Revenue</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            type="number"
            value={totalRevenue}
            label="Total Revenue"
            fullWidth={true}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            disabled={true}
          />
        </FormControl>
      </Grid>

      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Total Responses</InputLabel>
          <OutlinedInput
            className={classes.commonInputStyles}
            type="number"
            value={totalResponses}
            label="Total Responses"
            disabled={true}
            fullWidth={true}
          />
        </FormControl>
      </Grid>
    </Fragment>
  );
}
