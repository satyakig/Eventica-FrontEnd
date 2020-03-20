import React, { ChangeEvent, useEffect, useState, Fragment } from 'react';
import { eventChatStyles } from './EventChat.styles';
import { Avatar, Chip, List, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';

export const EventChat = (): JSX.Element => {
  const classes = eventChatStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  // <List>{renderRow}</List>
  return (
    <List>
      {[0, 1, 2, 3, 4].map((id, index) => {
        return (
          <ListItem key={index}>
            <Chip avatar={<Avatar src={user.photoURL} />} label={index} />
          </ListItem>
        );
      })}
    </List>
  );
};
