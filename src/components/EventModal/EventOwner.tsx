import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { EventUserType, USER_EVENT_STATUS } from 'redux/models/EventModel';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete/Autocomplete';
import { addUsersRequest } from 'lib/AddUserToEventRequests';

type EventOwnerProps = {
  eventUsers: EventUserType[];
  classes: any;
  pastEndDate: boolean;
  eventId: string;
};

const filter = createFilterOptions<string>();

export default function EventOwner(props: EventOwnerProps) {
  const { classes, eventUsers, pastEndDate, eventId } = props;
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const dispatch = useDispatch();

  const totalResponses = eventUsers.filter((user: EventUserType) => {
    return (
      user.status === USER_EVENT_STATUS.ATTENDING ||
      user.status === USER_EVENT_STATUS.MAYBE ||
      user.status === USER_EVENT_STATUS.NO
    );
  }).length;

  const totalRevenue = eventUsers
    .filter((user: EventUserType) => {
      return user.paid;
    })
    .reduce((accumulator: number, user: EventUserType) => {
      return accumulator + user.fee;
    }, 0);

  // @ts-ignore
  function onChange(event, values) {
    let newVals = values.map((val: string) => {
      return val.replace('Add ', '').trim();
    });

    newVals = new Set(newVals);
    setInviteEmails(Array.from(newVals));
  }

  function addUsers() {
    dispatch(
      addUsersRequest({
        eid: eventId,
        emails: inviteEmails,
      }),
    );
  }

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

      <Grid item={true} xs={12} sm={10}>
        <Autocomplete
          className={classes.commonInputStyles}
          freeSolo={true}
          multiple={true}
          filterSelectedOptions={true}
          value={inviteEmails}
          options={inviteEmails}
          filterOptions={(options: string[], params): string[] => {
            const filtered = filter(options, params);

            if (params.inputValue.trim() !== '') {
              filtered.push(`Add ${params.inputValue}`);
            }

            return filtered as string[];
          }}
          renderInput={(params) => {
            return <TextField {...params} variant="outlined" label="Add user(s) with email" />;
          }}
          onChange={onChange}
          disabled={pastEndDate}
        />
      </Grid>
      <Grid container={true} item={true} xs={4} sm={2} alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          className={classes.ownerAddButton}
          startIcon={<GroupAddIcon />}
          disabled={inviteEmails.length === 0}
          onClick={addUsers}
        >
          Add
        </Button>
      </Grid>
    </Fragment>
  );
}
