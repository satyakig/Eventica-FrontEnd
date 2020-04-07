import React, { useEffect, useRef, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { ReduxState } from 'redux/combinedReducer';
import { NotificationModel } from 'redux/models/NotificationModel';
import { setNetworkError } from 'redux/actions/AppStateActions';
import { notificationPopupStyles } from './NotificationPopup.styles';

function usePrevious(value: number): number {
  const ref = useRef<number>(0);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const AUTO_HIDE = 4 * 1000; // 4 secs
const MAX_TIME = 30 * 1000; // 30 secs

const NotificationPopup = (): JSX.Element => {
  const classes = notificationPopupStyles();
  const dispatch = useDispatch();
  const notifications = useSelector((state: ReduxState) => {
    return state.notifications;
  });

  const networkError = useSelector((state: ReduxState) => {
    return state.appState.networkErrorMessage;
  });

  const [activeNotif, setActiveNotif] = useState<null | NotificationModel>(null);
  const prevCount = usePrevious(notifications.length);

  function closeNotif() {
    setActiveNotif(null);

    if (activeNotif && activeNotif.networkError) {
      dispatch(setNetworkError(null));
    }
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

  useEffect(() => {
    if (networkError) {
      const notif = new NotificationModel();
      notif.message = networkError;
      notif.severity = 'error';
      notif.networkError = true;
      setActiveNotif(notif);
    }
  }, [networkError]);

  return (
    <div className={classes.container}>
      {activeNotif ? (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          className={classes.notification}
          autoHideDuration={AUTO_HIDE}
          transitionDuration={400}
          onClose={closeNotif}
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
