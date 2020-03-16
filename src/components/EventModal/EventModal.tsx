import React, { ChangeEvent, useState } from 'react';
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

type EventModalProps = {
  openEventModal: boolean;
  handleClose: () => void;
  event: EventModel | UserEventModel;
};

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

export const EventModal = (props: EventModalProps): JSX.Element => {
  const classes = eventModalStyles();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog onClose={props.handleClose} open={props.openEventModal} maxWidth="md" fullWidth={true}>
      <CardMedia
        style={{ height: 200, flexBasis: 200 }}
        component="img"
        alt={props.event.name}
        image={props.event.photoURL}
        title={props.event.name}
      />
      <Grid container>
        <Grid item xs>
          <Typography className={classes.title}>{props.event.name}</Typography>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton color={'secondary'} onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <AppBar position="static" color={'secondary'}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Description" />
          <Tab label="Participants" />
          {props.event instanceof UserEventModel && props.event.isUserHost() ? (
            <Tab label="Owner" />
          ) : null}
        </Tabs>
      </AppBar>
      <Container className={classes.container} maxWidth={'lg'}>
        <TabPanel value={tabIndex} index={0}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button
                color={
                  props.event instanceof UserEventModel && props.event.isUserYes()
                    ? 'primary'
                    : 'secondary'
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
                  props.event instanceof UserEventModel && props.event.isUserMaybe()
                    ? 'primary'
                    : 'secondary'
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
                  props.event instanceof UserEventModel && props.event.isUserNo()
                    ? 'primary'
                    : 'secondary'
                }
                variant={'contained'}
                fullWidth
              >
                No
              </Button>
            </Grid>
          </Grid>

          <Typography className={classes.heading}>Description</Typography>
          <Typography>{props.event.desc}</Typography>

          <Typography className={classes.heading}>Date & Time</Typography>
          <Typography>
            {moment(props.event.start).format("ddd MMM DD 'YY, h:mma")} -{' '}
            {moment(props.event.end).format('h:mma')}
          </Typography>

          <Typography className={classes.heading}>Price</Typography>
          <Typography>{props.event.fee === 0 ? 'Free' : `$${props.event.fee}`}</Typography>

          <Typography className={classes.heading}>Location</Typography>
          <Typography>{props.event.address}</Typography>

          <Typography className={classes.heading}>Status</Typography>
          <Typography>
            {lodash.startCase(EVENT_STATUS[props.event.status].toLowerCase())}
          </Typography>

          <Typography className={classes.heading}>Type</Typography>
          <Typography>{lodash.startCase(EVENT_TYPE[props.event.type].toLowerCase())}</Typography>

          <Typography className={classes.heading}>Categories</Typography>
          <Typography>{props.event.category.join(', ')}</Typography>

          <Typography className={classes.heading}>Capacity</Typography>
          <Typography>{props.event.capacity}</Typography>

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
        {props.event instanceof UserEventModel && props.event.isUserHost() ? (
          <TabPanel value={tabIndex} index={2}>
            <Typography>Owner</Typography>
          </TabPanel>
        ) : null}
      </Container>
    </Dialog>
  );
};
