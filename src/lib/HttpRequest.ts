import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from 'redux/combinedReducer';
import { AnyAction } from 'redux';
import { setNetworkError, setRequestExecutingAction } from 'redux/actions/AppStateActions';

export const PATHS = {
  EVENT: 'event',
  COMMENT: 'comment',
  USER_EVENT: 'user-event',
  USER: 'user',
  ADD_USER: 'add-user',
  TICKET: 'use-ticket',
};

export type ThunkActionType = ThunkAction<void, ReduxState, null, AnyAction>;

// http://localhost:3001/
const CLIENT: AxiosInstance = axios.create({
  baseURL: 'https://seng-513.appspot.com/',
});

export function postRequest(path: string, data: any): ThunkActionType {
  return (dispatch, getState) => {
    dispatch(setRequestExecutingAction(true));

    CLIENT.post(path, data, {
      headers: { Authorization: `Bearer ${getState().user.uid}` },
    })
      .then((response: AxiosResponse) => {
        dispatch(setRequestExecutingAction(false));
      })
      .catch((error: AxiosError) => {
        dispatch(setRequestExecutingAction(false));
        if (error.isAxiosError && !error.response) {
          dispatch(setNetworkError(error.message));
        }
      });
  };
}

export function patchRequest(path: string, data: any): ThunkActionType {
  return (dispatch, getState) => {
    dispatch(setRequestExecutingAction(true));

    CLIENT.patch(path, data, {
      headers: { Authorization: `Bearer ${getState().user.uid}` },
    })
      .then((response: AxiosResponse) => {
        dispatch(setRequestExecutingAction(false));
      })
      .catch((error: AxiosError) => {
        dispatch(setRequestExecutingAction(false));
        if (error.isAxiosError && !error.response) {
          dispatch(setNetworkError(error.message));
        }
      });
  };
}

export function deleteRequest(path: string, data: any): ThunkActionType {
  return (dispatch, getState) => {
    dispatch(setRequestExecutingAction(true));

    CLIENT.delete(path, {
      headers: {
        Authorization: `Bearer ${getState().user.uid}`,
      },
      data: data,
    })
      .then((response: AxiosResponse) => {
        dispatch(setRequestExecutingAction(false));
      })
      .catch((error: AxiosError) => {
        dispatch(setRequestExecutingAction(false));
        if (error.isAxiosError && !error.response) {
          dispatch(setNetworkError(error.message));
        }
      });
  };
}
