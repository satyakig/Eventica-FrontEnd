import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';
import { DB_PATHS, getDb } from 'lib/Firebase';
import { Notification } from 'redux/models/NotificationModel';
import { setNotificationsAction } from 'redux/actions/NotificationActions';

const NotificationsContainer = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const userId = useSelector((state: ReduxState) => {
    return state.user.uid;
  });

  useEffect(() => {
    if (userId) {
      const unsubscribe = getDb()
        .collection(DB_PATHS.NOTIFICATIONS)
        .where('uid', '==', userId)
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            } as Notification;
          });

          dispatch(setNotificationsAction(data));
        });

      return () => {
        return unsubscribe();
      };
    }
  }, [dispatch, userId]);

  return null;
};

export default NotificationsContainer;
