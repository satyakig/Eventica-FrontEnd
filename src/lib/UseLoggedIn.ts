import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';

export function useLoggedIn(): boolean {
  const loggedIn =
    useSelector((state: ReduxState) => {
      return state.user.uid;
    }).length > 0;

  return useMemo(() => {
    return loggedIn;
  }, [loggedIn]);
}
