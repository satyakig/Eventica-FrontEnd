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
} from '@material-ui/core';
import * as S from './EventModal.styles';
import { EventModel } from 'redux/models/EventModel';
import moment from 'moment-timezone';
import SendIcon from '@material-ui/icons/Send';

type EventModalProps = {
  openEventModal: boolean;
  handleClose: () => void;
  event: EventModel;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
  };
}

export const EventModal = (props: EventModalProps): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
      <S.Title>{props.event.name}</S.Title>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Description" {...a11yProps(0)}>
            <h1>Hello</h1>
          </Tab>
          <Tab label="Participants" {...a11yProps(1)} />
          <Tab label="Owner" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <S.StyledContainer maxWidth={'lg'}>
        <TabPanel value={value} index={0}>
          <Grid container spacing={5}>
            <Grid item xs>
              <Button variant={'contained'} fullWidth>
                Going
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant={'contained'} fullWidth>
                Maybe
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant={'contained'} fullWidth>
                No
              </Button>
            </Grid>
          </Grid>

          <S.Heading>Description</S.Heading>
          <Typography>{props.event.desc}</Typography>

          <S.Heading>Date & Time</S.Heading>
          <Typography>{moment(props.event.start).format("ddd h:mma, MMM DD 'YY")}</Typography>

          <S.Heading>Price</S.Heading>
          <Typography>${props.event.fee}</Typography>

          <S.Heading>Location</S.Heading>
          <Typography>{props.event.address}</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Participants
        </TabPanel>
        <TabPanel value={value} index={2}>
          Owner
        </TabPanel>
        <S.Heading>Comments</S.Heading>
        <S.CommentField multiline rows="4" variant="outlined" disabled style={{ width: '100%' }} />
        <Grid container>
          <Grid item xs={11}>
            <TextField
              placeholder={'Leave a comment'}
              variant={'outlined'}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={1}>
            <S.SendButton variant={'outlined'} fullWidth>
              <SendIcon />
            </S.SendButton>
          </Grid>
        </Grid>
      </S.StyledContainer>
    </Dialog>
  );
};
