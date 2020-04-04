import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DB_PATHS, getAuth, getDb } from 'lib/Firebase';
import {
  resetUserAction,
  updateUserFieldsAction,
  updateUserIdAction,
} from 'redux/actions/UserActions';
import { UserType } from 'redux/models/UserModel';
import { resetEventsAction } from 'redux/actions/EventsActions';
import { setRouteAction } from 'redux/actions/AppStateActions';
import { HOMEPAGE } from 'redux/models/AppStateModel';

const AuthContainer = (): JSX.Element | null => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUserIdAction(user.uid));

        getDb()
          .collection(DB_PATHS.USERS)
          .doc(user.uid)
          .onSnapshot(
            (doc) => {
              if (doc.exists) {
                dispatch(updateUserFieldsAction(doc.data() as UserType));
              }
            },
            (error) => {
              console.error(error);
              dispatch(resetUserAction());
            },
          );
      } else {
        dispatch(setRouteAction(HOMEPAGE));
        dispatch(resetUserAction());
        dispatch(resetEventsAction());
      }
    });

    return () => {
      return subscription();
    };
  }, [dispatch]);

  return null;
};

export default AuthContainer;
