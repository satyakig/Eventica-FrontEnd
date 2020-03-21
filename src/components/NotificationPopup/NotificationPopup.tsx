import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Snackbar, Fade } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { ReduxState } from 'redux/combinedReducer';
import { NotificationModel } from 'redux/models/NotificationModel';
import { notificationPopupStyles } from './NotificationPopup.styles';

function usePrevious(value: number): number {
  const ref = useRef<number>(0);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const AUTO_HIDE = 5 * 1000; // 4 secs
const MAX_TIME = 2 * 60 * 1000; // 2 min

const useStyles = makeStyles(notificationPopupStyles);

const NotificationPopup = (): JSX.Element => {
  const classes = useStyles();
  const notifications = useSelector((state: ReduxState) => {
    return state.notifications;
  });
  const [activeNotif, setActiveNotif] = useState<null | NotificationModel>(null);
  const prevCount = usePrevious(notifications.length);

  function closeNotif() {
    setActiveNotif(null);
  }

  useEffect(() => {
    if (notifications.length > prevCount && notifications.length > 0) {
      const lastNotif = notifications[0];
      const now = moment().valueOf();

      if (now - lastNotif.timestamp <= MAX_TIME && !lastNotif.seen) {
        setActiveNotif(lastNotif);
      }
    }
  }, [activeNotif, prevCount, notifications]);

  return (
    <div className={classes.container}>
      {activeNotif ? (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          className={classes.notification}
          autoHideDuration={AUTO_HIDE}
          TransitionComponent={Fade}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={activeNotif.severity}
            onClose={closeNotif}
          >
            {activeNotif.message}
          </MuiAlert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default NotificationPopup;
