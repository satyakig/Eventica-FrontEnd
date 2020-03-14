import { PATHS, postRequest } from './HttpRequest';

export interface UpdateUserEventType {
  eid: string; // Event Id
  status: number; // ATTENDING/NO/MAYBE from USER_EVENT_STATUS
}

/**
 * Say Yes/No/Maybe to event
 * @param {UpdateUserEventType} data
 * @returns {ThunkActionType}
 */
export function updateUserEvent(data: UpdateUserEventType) {
  return postRequest(PATHS.COMMENT, data);
}
