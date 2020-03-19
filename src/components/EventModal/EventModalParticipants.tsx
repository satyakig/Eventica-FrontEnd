import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { DB_PATHS, getDb } from 'lib/Firebase';
import { ReduxState } from 'redux/combinedReducer';
import { useSelector } from 'react-redux';
import { GenericDataMap } from 'lib/GenericDataMap';
import { User } from 'redux/models/UserModel';
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Tabs,
  Tab,
  Grid,
} from '@material-ui/core';
import { isExtraSmallDown } from '../../lib/useBreakPoints';

export const EventModalParticipants = (): JSX.Element => {
  const selectedEventId = useSelector((state: ReduxState) => {
    return state.events.selectedEvent;
  });

  const [userStatuses, setUserStatuses] = useState(new GenericDataMap<string, number>());
  const [users, setUsers] = useState(new GenericDataMap<string, User>());

  useEffect(() => {
    const unsubscribe = getDb()
      .collection(DB_PATHS.EVENT_USERS)
      .where('eid', '==', selectedEventId)
      .onSnapshot((doc) => {
        for (const value of doc.docs) {
          userStatuses.set(value.data().uid as string, value.data().status as number);
        }

        setUserStatuses(userStatuses.clone());
      });

    return () => {
      return unsubscribe();
    };
  }, [selectedEventId]);

  useEffect(() => {
    const unSubs: any[] = [];

    for (const uid of userStatuses.getAllIds()) {
      const unsubscribe = getDb()
        .collection(DB_PATHS.USERS)
        .where('uid', '==', uid)
        .onSnapshot((doc) => {
          const user = doc.docs[0].data() as User;

          users.set(user.uid, user);
          setUsers(users.clone());
        });

      unSubs.push(unsubscribe);
    }

    return () => {
      for (const unsub of unSubs) {
        unsub();
      }
    };
  }, [userStatuses]);

  const [tabIndex, setTabIndex] = useState(0);
  const isXs = isExtraSmallDown();
  function handleTabChange(e: ChangeEvent<{}>, newValue: number) {
    setTabIndex(newValue);
  }

  function getTab() {
    switch (tabIndex) {
      case 0: // Attending
        return (
          <List>
            {console.log(users)}
            {users
              .getAllData()
              .filter((user) => {
                return userStatuses.get(user.uid) === 1;
              })
              .map((user) => {
                return (
                  <ListItem key={user.uid}>
                    <ListItemAvatar>
                      <Avatar src={user.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                );
              })}
          </List>
        );
      case 1: // Maybe
        return (
          <List>
            {console.log(users)}
            {users
              .getAllData()
              .filter((user) => {
                return userStatuses.get(user.uid) === 2;
              })
              .map((user) => {
                return (
                  <ListItem key={user.uid}>
                    <ListItemAvatar>
                      <Avatar src={user.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                );
              })}
          </List>
        );
      case 2: // No
        return (
          <List>
            {console.log(users)}
            {users
              .getAllData()
              .filter((user) => {
                return userStatuses.get(user.uid) === 3;
              })
              .map((user) => {
                return (
                  <ListItem key={user.uid}>
                    <ListItemAvatar>
                      <Avatar src={user.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                );
              })}
          </List>
        );
    }
  }

  return (
    <Container>
      <Grid item={true} xs={12}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="secondary"
          scrollButtons={isXs ? 'on' : 'auto'}
        >
          <Tab
            label={`Attending ( ${
              userStatuses.getAllData().filter((status) => {
                return status === 1;
              }).length
            } )`}
          />
          <Tab
            label={`Maybe ( ${
              userStatuses.getAllData().filter((status) => {
                return status === 2;
              }).length
            } )`}
          />
          <Tab
            label={`No ( ${
              userStatuses.getAllData().filter((status) => {
                return status === 3;
              }).length
            } )`}
          />
        </Tabs>
      </Grid>
      <Grid container={true} spacing={2}>
        {getTab()}
      </Grid>
    </Container>
  );
};
