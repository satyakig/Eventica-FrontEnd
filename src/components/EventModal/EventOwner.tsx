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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { EventUserType, USER_EVENT_STATUS } from 'redux/models/EventModel';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete/Autocomplete';
import { addUsersRequest } from 'lib/AddUserToEventRequests';
import { checkinUser } from 'lib/TicketRequests';
import QrReader from 'react-qr-reader';

type EventOwnerProps = {
  eventUsers: EventUserType[];
  classes: any;
  pastEndDate: boolean;
  eventId: string;
  eventStatus: string;
};

const filter = createFilterOptions<string>();

export default function EventOwner(props: EventOwnerProps) {
  const { classes, eventUsers, pastEndDate, eventId, eventStatus } = props;
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanSuccessAlertOpen, setScanSuccessAlertOpen] = useState(false);
  const [scanFailAlertOpen, setScanFailAlertOpen] = useState(false);
  const [scannedUser, setScannedUser] = useState('');
  const [scannedUID, setScannedUID] = useState('');

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

  const toggleScanner = () => {
    setScannerOpen(!scannerOpen);
  };

  function handleScan(data: string | null) {
    if (data) {
      try {
        const ticketData = JSON.parse(data);

        const ticket = eventUsers.find((user: EventUserType) => {
          return (
            user.uid === ticketData.uid &&
            user.eid === ticketData.eventId &&
            user.paid &&
            !user.checkedIn
          );
        });

        if (ticket) {
          setScannedUser(ticket.name);
          setScannedUID(ticket.uid);

          setScanSuccessAlertOpen(true);
          setScanFailAlertOpen(false);
        } else {
          setScanSuccessAlertOpen(false);
          setScanFailAlertOpen(true);
        }
      } catch (err) {
        setScanSuccessAlertOpen(false);
        setScanFailAlertOpen(true);
      }
    }
  }

  function handleCheckin() {
    setScanSuccessAlertOpen(false);
    setScanFailAlertOpen(false);

    dispatch(
      checkinUser({
        eid: eventId,
        uid: scannedUID,
      }),
    );

    handleClose();
  }

  function handleError(err: any) {
    console.error(err);
  }

  function handleClose() {
    setScannedUser('');
    setScannedUID('');

    setScanSuccessAlertOpen(false);
    setScanFailAlertOpen(false);
  }

  return (
    <Fragment>
      <Grid item={true} xs={6}>
        <FormControl variant="outlined" fullWidth={true}>
          <InputLabel>Total Revenue</InputLabel>
          <OutlinedInput
            className={classes.ownerInputStyles}
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
            className={classes.ownerInputStyles}
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
      {scannerOpen && !pastEndDate && eventStatus === 'Active' ? (
        <Grid item={true} xs={12}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </Grid>
      ) : null}
      {!pastEndDate && eventStatus === 'Active' ? (
        <Grid item={true} xs={12}>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            className={classes.scanButton}
            onClick={toggleScanner}
          >
            {scannerOpen ? 'Stop ' : 'Start '}
            Scanning Tickets
          </Button>
        </Grid>
      ) : null}
      <Dialog open={scanSuccessAlertOpen} onClose={handleClose}>
        <DialogTitle>Ticket scanned</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Scanned ticket for {scannedUser}. Would you like to check them in?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCheckin} variant="outlined" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={scanFailAlertOpen} onClose={handleClose}>
        <DialogTitle>Invalid Ticket</DialogTitle>
        <DialogContent>The ticket is invalid or it has already been used.</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
