import { patchRequest, PATHS, postRequest } from './HttpRequest';

export interface CreateCommentType {
  eid: string;
  message?: string;
  photoURL?: string;
}

export interface UpdateCommentType extends CreateCommentType {
  cid: string;
}

/**
 * Create Comment Http Request
 * @param {CreateCommentType} data
 * @returns {ThunkActionType}
 */
export function createEvent(data: CreateCommentType) {
  return postRequest(PATHS.COMMENT, data);
}

/**
 * Update Comment Http Request
 * @param {UpdateCommentType} data
 * @returns {ThunkActionType}
 */
export function updateEvent(data: UpdateCommentType) {
  return patchRequest(PATHS.COMMENT, data);
}
