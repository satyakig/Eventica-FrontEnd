import { User } from '../models/UserModel';
import { newState } from '../NewState';
import {
  USER_ACTION_CONSTANTS,
  UpdateUserIdActionType,
  UpdateUserDataActionType,
} from '../actions/UserActions';

type ActionType = UpdateUserIdActionType & UpdateUserDataActionType;

export const UserReducer = (state: User = new User(), action: ActionType): User => {
  if (action.type === USER_ACTION_CONSTANTS.UPDATE_USER_ID) {
    return newState(state, {
      uid: action.id,
    });
  }

  if (action.type === USER_ACTION_CONSTANTS.UPDATE_USER_DATA) {
    return new User(action.user);
  }

  if (action.type === USER_ACTION_CONSTANTS.RESET_USER) {
    return new User();
  }

  return state;
};
