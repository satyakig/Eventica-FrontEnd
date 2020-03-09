import { EventModel, EventsModel } from '../models/EventModel';
import { newState } from '../NewState';
import {
  EVENT_ACTIONS_CONSTANTS,
  UpdateSelectedEventActionType,
  SetEventActionType,
} from '../actions/EventsActions';

type ActionType = UpdateSelectedEventActionType & SetEventActionType;

export const EventsReducer = (
  state: EventsModel = new EventsModel(),
  action: ActionType,
): EventsModel => {
  if (action.type === EVENT_ACTIONS_CONSTANTS.UPDATE_SELECTED_EVENT) {
    return newState(state, {
      selectedEvent: action.eventId,
    });
  }

  if (action.type === EVENT_ACTIONS_CONSTANTS.SET_EVENT) {
    const event = new EventModel(action.event, action.userEvent);
    state.events.set(event.eid, event);

    return newState(state, {
      events: state.events.clone(),
    });
  }

  if (action.type === EVENT_ACTIONS_CONSTANTS.RESET_EVENTS) {
    return new EventsModel();
  }

  return state;
};
