import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getDb } from '../lib/Firebase';
import {
  resetUserAction,
  updateUserIdAction,
  updateUserFieldsAction,
} from '../redux/actions/UserActions';

export const AuthContainer = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => {
    return state.userReducer.uid;
  });

  useEffect(() => {
    const subscription = getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUserIdAction(user.uid));
      } else {
        dispatch(resetUserAction());
      }
    });

    return () => {
      return subscription();
    };
  });

  useEffect(() => {
    if (userId) {
      const unsubscribe = getDb()
        .collection('user')
        .doc(userId)
        .onSnapshot(
          (doc) => {
            dispatch(updateUserFieldsAction(doc.data()));
          },
          (error) => {
            dispatch(resetUserAction());
          },
        );

      return () => {
        return unsubscribe();
      };
    }
  }, [dispatch, userId]);

  return <div id="AuthContainer" />;
};
