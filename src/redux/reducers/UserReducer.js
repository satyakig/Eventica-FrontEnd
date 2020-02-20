import { User } from '../models/User';
import { USER_ACTION_CONSTANTS } from '../actions/UserActions';

export const userReducer = (state = new User(), action) => {
  if (
    action.type === USER_ACTION_CONSTANTS.UPDATE_USER_ID_ACTION_TYPE ||
    action.type === USER_ACTION_CONSTANTS.UPDATE_USER_DATA_ACTION_TYPE ||
    action.type === USER_ACTION_CONSTANTS.RESET_USER_ACTION_TYPE
  ) {
    return action.user;
  } else {
    return state;
  }
};
