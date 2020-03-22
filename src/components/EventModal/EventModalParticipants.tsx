import React from 'react';
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
import { EventUserType, USER_EVENT_STATUS } from '../../redux/models/EventModel';

export interface EventParticipantsProps {
  eventUsers: EventUserType[];
  classes: any;
}

export const EventModalParticipants = (props: EventParticipantsProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => {
    return (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  };

  return (
    <React.Fragment>
      <Grid item={true} xs={12}>
        <ExpansionPanel className={props.classes.expansionPanel} expanded={true}>
          <ExpansionPanelSummary className={props.classes.expansionPanelLabel}>
            <div className={props.classes.hostCard}>
              hosted by{' '}
              {props.eventUsers
                .filter((user) => {
                  return user.status === USER_EVENT_STATUS.HOST;
                })
                .map((user) => {
                  return user.name;
                })}
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>

        <ExpansionPanel
          className={props.classes.expansionPanel}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <ExpansionPanelSummary
            className={props.classes.expansionPanelLabel}
            expandIcon={<ExpandMoreIcon />}
          >{`attending - ${
            props.eventUsers.filter((eventUser) => {
              return eventUser.status === USER_EVENT_STATUS.ATTENDING;
            }).length
          }`}</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {props.eventUsers
                .filter((user) => {
                  return user.status === USER_EVENT_STATUS.ATTENDING;
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          className={props.classes.expansionPanel}
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <ExpansionPanelSummary
            className={props.classes.expansionPanelLabel}
            expandIcon={<ExpandMoreIcon />}
          >{`maybe - ${
            props.eventUsers.filter((eventUser) => {
              return eventUser.status === USER_EVENT_STATUS.MAYBE;
            }).length
          }`}</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {props.eventUsers
                .filter((user) => {
                  return user.status === USER_EVENT_STATUS.MAYBE;
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          className={props.classes.expansionPanel}
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <ExpansionPanelSummary
            className={props.classes.expansionPanelLabel}
            expandIcon={<ExpandMoreIcon />}
          >{`no - ${
            props.eventUsers.filter((eventUser) => {
              return eventUser.status === USER_EVENT_STATUS.NO;
            }).length
          }`}</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {props.eventUsers
                .filter((user) => {
                  return user.status === USER_EVENT_STATUS.NO;
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          className={props.classes.expansionPanel}
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <ExpansionPanelSummary
            className={props.classes.expansionPanelLabel}
            expandIcon={<ExpandMoreIcon />}
          >{`invited - ${
            props.eventUsers.filter((eventUser) => {
              return eventUser.status === USER_EVENT_STATUS.INVITED;
            }).length
          }`}</ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {props.eventUsers
                .filter((user) => {
                  return user.status === USER_EVENT_STATUS.INVITED;
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </React.Fragment>
  );
};
