import React, { ChangeEvent, useEffect, useState } from 'react';
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
} from '@material-ui/core';
import { EVENT_STATUS, EVENT_TYPE, EventModel, UserEventModel } from 'redux/models/EventModel';
import moment from 'moment-timezone';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import * as lodash from 'lodash';
import { eventModalStyles } from './EventModal.styles';
import { clearSelectedEventAction } from '../../redux/actions/EventsActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';

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

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const eventId = useSelector((state: ReduxState) => {
    return state.events.selectedEvent;
  });

  const event = useSelector((state: ReduxState) => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [eventId]);

  function closeEventModal() {
    dispatch(clearSelectedEventAction());
  }

  return (
    <Dialog onClose={closeEventModal} open={isModalOpen} maxWidth="md" fullWidth={true}>
      <CardMedia
        style={{ height: 200, flexBasis: 200 }}
        component="img"
        alt={event.name}
        image={event.photoURL}
        title={event.name}
      />
      <Grid container>
        <Grid item xs>
          <Typography className={classes.title}>{event.name}</Typography>
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
                  event instanceof UserEventModel && event.isUserMaybe() ? 'primary' : 'secondary'
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

          <Typography className={classes.heading}>Description</Typography>
          <Typography>{event.desc}</Typography>

          <Typography className={classes.heading}>Date & Time</Typography>
          <Typography>
            {moment(event.start).format("ddd MMM DD 'YY, h:mma")} -{' '}
            {moment(event.end).format('h:mma')}
          </Typography>

          <Typography className={classes.heading}>Price</Typography>
          <Typography>{event.fee === 0 ? 'Free' : `$${event.fee}`}</Typography>

          <Typography className={classes.heading}>Location</Typography>
          <Typography>{event.address}</Typography>

          <Typography className={classes.heading}>Status</Typography>
          <Typography>{lodash.startCase(EVENT_STATUS[event.status].toLowerCase())}</Typography>

          <Typography className={classes.heading}>Type</Typography>
          <Typography>{lodash.startCase(EVENT_TYPE[event.type].toLowerCase())}</Typography>

          <Typography className={classes.heading}>Categories</Typography>
          <Typography>{event.category.join(', ')}</Typography>

          <Typography className={classes.heading}>Capacity</Typography>
          <Typography>{event.capacity}</Typography>

          <Typography className={classes.heading}>Comments</Typography>
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
