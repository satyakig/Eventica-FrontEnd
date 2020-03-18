import { GenericDataMap } from 'lib/GenericDataMap';
import { EventModel, EventsModel, UserEventModel } from '../models/EventModel';
import { newState } from '../NewState';
import {
  EVENT_ACTION_CONSTANTS,
  UpdateSelectedEventActionType,
  SetUserEventActionType,
  SetEventsActionType,
} from '../actions/EventsActions';

type ActionType = UpdateSelectedEventActionType & SetUserEventActionType & SetEventsActionType;

export const EventsReducer = (
  state: EventsModel = new EventsModel(),
  action: ActionType,
): EventsModel => {
  if (action.type === EVENT_ACTION_CONSTANTS.UPDATE_SELECTED_EVENT) {
    const selectedEvent = action.eventId;

    if (
      selectedEvent.length > 0 &&
      !state.events.get(selectedEvent) &&
      !state.userEvents.get(selectedEvent)
    ) {
      return state;
    }

    return newState(state, {
      selectedEvent,
    });
  }

  if (action.type === EVENT_ACTION_CONSTANTS.SET_USER_EVENT) {
    const event = new UserEventModel(action.event, action.userEvent);
    state.userEvents.set(event.eid, event);

    return newState(state, {
      userEvents: state.userEvents.clone(),
    });
  }

  if (action.type === EVENT_ACTION_CONSTANTS.SET_EVENTS) {
    const events = action.events.map((event) => {
      return new EventModel(event);
    });

    return newState(state, {
      events: new GenericDataMap<string, EventModel>('eid', events),
    });
  }

  if (action.type === EVENT_ACTION_CONSTANTS.RESET_EVENTS) {
    return newState(state, {
      selectedEvent: '',
      userEvents: new GenericDataMap<string, UserEventModel>(),
    });
  }

  return state;
};
