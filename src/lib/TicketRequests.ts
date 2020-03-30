import { PATHS, postRequest } from './HttpRequest';

export interface TicketCheckinType {
  eid: string;
  uid: string;
}

/**
 * Checkin to Event Http Request
 * @param {TicketCheckinType} data
 * @returns {ThunkActionType}
 */
export function checkinUser(data: TicketCheckinType) {
  return postRequest(PATHS.TICKET, data);
}
