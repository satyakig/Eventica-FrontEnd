import React from 'react';
import classNames from 'classnames';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EventUserType, USER_EVENT_STATUS } from 'redux/models/EventModel';

export interface EventParticipantsProps {
  eventUsers: EventUserType[];
  classes: any;
}

export const EventParticipants = (props: EventParticipantsProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => {
    return (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  };

  const hosts = props.eventUsers.filter((user) => {
    return user.status === USER_EVENT_STATUS.HOST;
  });

  const attendees = props.eventUsers.filter((user) => {
    return user.status === USER_EVENT_STATUS.ATTENDING;
  });

  const maybes = props.eventUsers.filter((user) => {
    return user.status === USER_EVENT_STATUS.MAYBE;
  });

  const nos = props.eventUsers.filter((user) => {
    return user.status === USER_EVENT_STATUS.NO;
  });

  const invitees = props.eventUsers.filter((user) => {
    return user.status === USER_EVENT_STATUS.INVITED;
  });

  return (
    <Grid item={true} xs={12}>
      <ExpansionPanel className={props.classes.expansionPanel} expanded={false}>
        <ExpansionPanelSummary
          className={classNames(props.classes.expansionPanelLabel, props.classes.hostCursor)}
        >
          <div className={props.classes.hostCard}>
            hosted by &nbsp;
            {hosts.map((user) => {
              return user.name;
            })}
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>

      <ExpansionPanel
        className={props.classes.expansionPanel}
        expanded={expanded === 'attending'}
        onChange={handleChange('attending')}
      >
        <ExpansionPanelSummary
          className={props.classes.expansionPanelLabel}
          expandIcon={attendees.length > 0 ? <ExpandMoreIcon /> : null}
        >{`attending - ${attendees.length}`}</ExpansionPanelSummary>
        {attendees.length > 0 ? (
          <ExpansionPanelDetails>
            <List>
              {attendees.map((user) => {
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
          </ExpansionPanelDetails>
        ) : null}
      </ExpansionPanel>

      <ExpansionPanel
        className={props.classes.expansionPanel}
        expanded={expanded === 'maybe'}
        onChange={handleChange('maybe')}
      >
        <ExpansionPanelSummary
          className={props.classes.expansionPanelLabel}
          expandIcon={maybes.length > 0 ? <ExpandMoreIcon /> : null}
        >{`maybe - ${maybes.length}`}</ExpansionPanelSummary>
        {maybes.length > 0 ? (
          <ExpansionPanelDetails>
            <List>
              {maybes.map((user) => {
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
          </ExpansionPanelDetails>
        ) : null}
      </ExpansionPanel>

      <ExpansionPanel
        className={props.classes.expansionPanel}
        expanded={expanded === 'no'}
        onChange={handleChange('no')}
      >
        <ExpansionPanelSummary
          className={props.classes.expansionPanelLabel}
          expandIcon={nos.length > 0 ? <ExpandMoreIcon /> : null}
        >{`no - ${nos.length}`}</ExpansionPanelSummary>
        {nos.length > 0 ? (
          <ExpansionPanelDetails>
            <List>
              {nos.map((user) => {
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
          </ExpansionPanelDetails>
        ) : null}
      </ExpansionPanel>

      <ExpansionPanel
        className={props.classes.expansionPanel}
        expanded={expanded === 'invited'}
        onChange={handleChange('invited')}
      >
        <ExpansionPanelSummary
          className={props.classes.expansionPanelLabel}
          expandIcon={invitees.length > 0 ? <ExpandMoreIcon /> : null}
        >{`invited - ${invitees.length}`}</ExpansionPanelSummary>
        {invitees.length > 0 ? (
          <ExpansionPanelDetails>
            <List>
              {invitees.map((user) => {
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
          </ExpansionPanelDetails>
        ) : null}
      </ExpansionPanel>
    </Grid>
  );
};
