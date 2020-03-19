import { Action } from 'redux';
import { EventUserType, EventType } from '../models/EventModel';

export const EVENT_ACTION_CONSTANTS = {
  SET_USER_EVENT: 'SET_USER_EVENT',
  UPDATE_SELECTED_EVENT: 'UPDATE_SELECTED_EVENT',
  CLEAR_SELECTED_EVENT: 'CLEAR_SELECTED_EVENT',
  RESET_EVENTS: 'RESET_EVENTS',
  SET_EVENTS: 'SET_EVENTS',
};

export type UpdateSelectedEventActionType = {
  eventId: string;
} & Action;

export type SetUserEventActionType = {
  event: EventType;
  userEvent: EventUserType;
} & Action;

export type SetEventsActionType = {
  events: EventType[];
} & Action;

export function updateSelectedEventAction(eventId: string): UpdateSelectedEventActionType {
  return {
    type: EVENT_ACTION_CONSTANTS.UPDATE_SELECTED_EVENT,
    eventId,
  };
}

export function clearSelectedEventAction(): Action {
  return {
    type: EVENT_ACTION_CONSTANTS.CLEAR_SELECTED_EVENT,
  };
}

export function setEventsAction(events: EventType[]): SetEventsActionType {
  return {
    type: EVENT_ACTION_CONSTANTS.SET_EVENTS,
    events,
  };
}

export function setUserEventAction(
  event: EventType,
  userEvent: EventUserType,
): SetUserEventActionType {
  return {
    type: EVENT_ACTION_CONSTANTS.SET_USER_EVENT,
    event,
    userEvent,
  };
}

export function resetEventsAction(): Action {
  return {
    type: EVENT_ACTION_CONSTANTS.RESET_EVENTS,
  };
}
