import { patchRequest, PATHS } from './HttpRequest';

export interface UpdateUserType {
  name: string;
  phone: string;
  photoURL: string;
}

/**
 * Say Yes/No/Maybe to event
 * @param {UpdateUserEventType} data
 * @returns {ThunkActionType}
 */
export function updateUser(data: UpdateUserType) {
  return patchRequest(PATHS.USER, data);
}
