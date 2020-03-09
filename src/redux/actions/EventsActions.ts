import { Action } from 'redux';
import { EventUserType, EventType } from '../models/EventModel';

export const EVENT_ACTIONS_CONSTANTS = {
  SET_EVENT: 'SET_EVENT',
  UPDATE_SELECTED_EVENT: 'UPDATE_SELECTED_EVENT',
  RESET_EVENTS: 'RESET_EVENTS',
};

export type UpdateSelectedEventActionType = {
  eventId: string;
} & Action;

export type SetEventActionType = {
  event: EventType;
  userEvent: EventUserType;
} & Action;

export function updateSelectedEventAction(eventId: string): UpdateSelectedEventActionType {
  return {
    type: EVENT_ACTIONS_CONSTANTS.UPDATE_SELECTED_EVENT,
    eventId,
  };
}

export function setEventAction(event: EventType, userEvent: EventUserType): SetEventActionType {
  return {
    type: EVENT_ACTIONS_CONSTANTS.SET_EVENT,
    event,
    userEvent,
  };
}

export function resetEventsAction(): Action {
  return {
    type: EVENT_ACTIONS_CONSTANTS.RESET_EVENTS,
  };
}
