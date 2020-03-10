import { deleteRequest, patchRequest, PATHS, postRequest } from './HttpRequest';

export interface CreateEventType {
  name: string;
  address: string;
  category: string[];
  photoURL: string;
  desc: string;
  start: number;
  end: number;
  fee: number;
  type: number;
}

export interface UpdateEventType extends CreateEventType {
  eid: string;
  status: number;
}

export interface DeleteEventType {
  eid: string;
}

/**
 * Create Event Http Request
 * @param {CreateEventType} data
 * @returns {ThunkActionType}
 */
export function createEvent(data: CreateEventType) {
  return postRequest(PATHS.EVENT, data);
}

/**
 * Update Event Http Request
 * @param {UpdateEventType} data
 * @returns {ThunkActionType}
 */
export function updateEvent(data: UpdateEventType) {
  return patchRequest(PATHS.EVENT, data);
}

/**
 * Delete Event Http Request
 * @param {DeleteEventType} data
 * @returns {ThunkActionType}
 */
export function deleteEvent(data: DeleteEventType) {
  return deleteRequest(PATHS.EVENT, data);
}
