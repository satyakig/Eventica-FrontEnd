import { patchRequest, PATHS } from './HttpRequest';

export interface UpdateUserType {
  name: string;
  phone: string;
  photoURL: string;
}

/**
 * Update user info
 * @param {UpdateUserEventType} data
 * @returns {ThunkActionType}
 */
export function updateUser(data: UpdateUserType) {
  return patchRequest(PATHS.USER, data);
}
