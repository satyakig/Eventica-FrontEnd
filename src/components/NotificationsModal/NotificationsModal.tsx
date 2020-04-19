import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  Grid,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { ReduxState } from 'redux/combinedReducer';
import { NotificationModel } from 'redux/models/NotificationModel';
import { DB_PATHS, getDb } from 'lib/Firebase';
import { notificationModalStyles } from './NotificationModal.styles';

const NOTIF_TIME_FORMAT = 'MMM D YYYY, h:mm a';

interface NotificationsModalProps {
  open: boolean;
  handleClose: () => void;
}

const NotificationModal = (props: NotificationsModalProps) => {
  const classes = notificationModalStyles();

  const notifications = useSelector((state: ReduxState) => {
    return state.notifications;
  });

  function dismissNotification(notif: NotificationModel) {
    return () => {
      getDb().collection(DB_PATHS.NOTIFICATIONS).doc(notif.id).update({
        seen: true,
      });
    };
  }

  return (
    <Dialog
      className={classes.dialog}
      open={props.open}
      onClose={props.handleClose}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      fullWidth={true}
      maxWidth="xs"
    >
      <IconButton className={classes.closeButton} onClick={props.handleClose} color="secondary">
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography className={classes.title} variant="h6" component="span" display="block">
          Notifications
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.gridContainer}>
        <Grid container={true} spacing={1}>
          {notifications
            .filter((notif) => {
              return !notif.seen;
            })
            .map((notif, index) => {
              return (
                <Grid item={true} xs={12} key={index}>
                  <Card className={classes.cardContainer}>
                    <CardContent>
                      <Typography color="secondary" variant="subtitle2">
                        {notif.title}
                      </Typography>
                      <Typography color="textSecondary" variant="caption" gutterBottom={true}>
                        {moment(notif.timestamp).format(NOTIF_TIME_FORMAT)}
                      </Typography>
                      <Typography variant="body2" component="p" className={classes.body}>
                        {notif.message}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                      <Button variant="outlined" size="small" onClick={dismissNotification(notif)}>
                        Dismiss
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
