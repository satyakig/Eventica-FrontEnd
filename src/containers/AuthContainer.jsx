import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth } from '../lib/Firebase';
import { resetUserAction, updateUserFieldsAction } from '../redux/actions/UserActions';

export const AuthContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUserFieldsAction(user.providerData[0]));
      } else {
        dispatch(resetUserAction());
      }
    });

    return () => {
      return subscription();
    };
  }, [dispatch]);

  return <div id="AuthContainer" />;
};
