import { postRequest, PATHS } from './HttpRequest';

export interface AddUserType {
  eid: string; // event id
  emails: string[]; // emails of users to add
}

/**
 * Add users to event request
 * @param {AddUserType} data
 * @returns {ThunkActionType}
 */
export function addUsersRequest(data: AddUserType) {
  return postRequest(PATHS.ADD_USER, data);
}
