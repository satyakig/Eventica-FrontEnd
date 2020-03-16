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
} from '@material-ui/core';
import * as S from './EventModal.styles';
import { EVENT_STATUS, EVENT_TYPE, EventModel, UserEventModel } from 'redux/models/EventModel';
import moment from 'moment-timezone';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import * as lodash from 'lodash';

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
          <S.Title>{props.event.name}</S.Title>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton color={'secondary'} onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <AppBar position="static" color={'secondary'}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Description">
            <h1>Hello</h1>
          </Tab>
          <Tab label="Participants" />
          {props.event instanceof UserEventModel && props.event.isUserHost() ? (
            <Tab label="Owner" />
          ) : null}
        </Tabs>
      </AppBar>
      <S.StyledContainer maxWidth={'lg'}>
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

          <S.Heading>Description</S.Heading>
          <Typography>{props.event.desc}</Typography>

          <S.Heading>Date & Time</S.Heading>
          <Typography>
            {moment(props.event.start).format("ddd MMM DD 'YY, h:mma")} -{' '}
            {moment(props.event.end).format('h:mma')}
          </Typography>

          <S.Heading>Price</S.Heading>
          <Typography>{props.event.fee === 0 ? 'Free' : `$${props.event.fee}`}</Typography>

          <S.Heading>Location</S.Heading>
          <Typography>{props.event.address}</Typography>

          <S.Heading>Status</S.Heading>
          <Typography>
            {lodash.startCase(EVENT_STATUS[props.event.status].toLowerCase())}
          </Typography>

          <S.Heading>Type</S.Heading>
          <Typography>{lodash.startCase(EVENT_TYPE[props.event.type].toLowerCase())}</Typography>

          <S.Heading>Categories</S.Heading>
          <Typography>{props.event.category.join(', ')}</Typography>

          <S.Heading>Capacity</S.Heading>
          <Typography>{props.event.capacity}</Typography>

          <S.Heading>Comments</S.Heading>
          <S.CommentField
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
              <S.SendButton variant={'outlined'} fullWidth>
                <SendIcon />
              </S.SendButton>
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
      </S.StyledContainer>
    </Dialog>
  );
};
