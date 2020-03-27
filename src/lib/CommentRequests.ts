import { patchRequest, PATHS, postRequest } from './HttpRequest';

// At least one of message or photoURL
export interface CreateCommentType {
  eid: string; // event id
  message?: string;
  photoURL?: string;
}

export interface UpdateCommentType extends CreateCommentType {
  cid: string; // comment id
}

/**
 * Create Comment Http Request
 * @param {CreateCommentType} data
 * @returns {ThunkActionType}
 */
export function createComment(data: CreateCommentType) {
  return postRequest(PATHS.COMMENT, data);
}

/**
 * Update Comment Http Request
 * @param {UpdateCommentType} data
 * @returns {ThunkActionType}
 */
export function updateComment(data: UpdateCommentType) {
  return patchRequest(PATHS.COMMENT, data);
}
