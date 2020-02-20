import { User } from '../models/User';
import { USER_ACTION_CONSTANTS } from '../actions/UserActions';

export const userReducer = (state = new User(), action) => {
  if (action.type === USER_ACTION_CONSTANTS.UPDATE_USER_DATA_ACTION_TYPE) {
    const user = new User();
    user.uid = action.user.uid;
    user.displayName = action.user.displayName;
    user.email = action.user.email;
    user.phoneNumber = action.user.phoneNumber;
    user.photoUrl = action.user.photoURL;
    return user;
  } else if (action.type === USER_ACTION_CONSTANTS.RESET_USER_ACTION_TYPE) {
    return state;
  } else {
    return state;
  }
};
