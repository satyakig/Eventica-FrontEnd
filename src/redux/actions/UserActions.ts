import { Action } from 'redux';
import { UserType } from '../models/UserModel';

export const USER_ACTION_CONSTANTS = {
  UPDATE_USER_ID: 'UPDATE_USER_ID',
  UPDATE_USER_DATA: 'UPDATE_USER_DATA',
  RESET_USER: 'RESET_USER',
};

export type UpdateUserIdActionType = {
  id: string;
} & Action;

export type UpdateUserDataActionType = {
  user: UserType;
} & Action;

export function updateUserIdAction(id: string): UpdateUserIdActionType {
  return {
    type: USER_ACTION_CONSTANTS.UPDATE_USER_ID,
    id,
  };
}

export function updateUserFieldsAction(user: UserType): UpdateUserDataActionType {
  return {
    type: USER_ACTION_CONSTANTS.UPDATE_USER_DATA,
    user,
  };
}

export function resetUserAction(): Action {
  return {
    type: USER_ACTION_CONSTANTS.RESET_USER,
  };
}
