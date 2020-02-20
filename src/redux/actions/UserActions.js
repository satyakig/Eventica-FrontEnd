import { User } from '../models/User';

export const USER_ACTION_CONSTANTS = {
  UPDATE_USER_ID_ACTION_TYPE: 'UPDATE_USER_ID',
  UPDATE_USER_DATA_ACTION_TYPE: 'UPDATE_USER_FIELDS',
  RESET_USER_ACTION_TYPE: 'RESET_USER',
};

/**
 * Create an action that updates the user id
 * @param id
 * @returns Update User ID Action
 */
export function updateUserIdAction(id) {
  const user = new User();
  user.uid = id;

  return {
    type: USER_ACTION_CONSTANTS.UPDATE_USER_ID_ACTION_TYPE,
    user,
  };
}

/**
 * Create an action that updates the user arguments
 * @param user
 * @returns Update User Fields Action
 */
export function updateUserFieldsAction(user) {
  return {
    type: USER_ACTION_CONSTANTS.UPDATE_USER_DATA_ACTION_TYPE,
    user,
  };
}

/**
 * Create an action that resets the user fields
 * @returns Reset User Action
 */
export function resetUserAction() {
  return {
    type: USER_ACTION_CONSTANTS.RESET_USER_ACTION_TYPE,
    user: new User(),
  };
}
