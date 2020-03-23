import { GenericDataMap } from 'lib/GenericDataMap';

export const EVENT_TYPE: Record<string, number> = {
  PUBLIC: 0,
  PRIVATE: 1,
};

export const EVENT_STATUS: Record<string, number> = { ACTIVE: 0, POSTPONED: 1, CANCELLED: 2 };

export const USER_EVENT_STATUS: Record<string, number> = {
  HOST: 0,
  ATTENDING: 1,
  MAYBE: 2,
  NO: 3,
  INVITED: 4,
};

export const EVENT_TYPE_LABELS = ['Public', 'Private'];

export const EVENT_STATUS_LABELS = ['Active', 'Postponed', 'Cancelled'];

export const USER_EVENT_STATUS_LABELS = ['Host', 'Attending', 'Maybe', 'Not Attending', 'Invited'];

/**
 * Get the Event Type from the display string
 */
export function getEventType(inp: string): number {
  const val = EVENT_TYPE[inp.toUpperCase()];

  return val !== undefined ? val : -1;
}

/**
 * Get the Event Status from the display value
 */
export function getEventStatus(inp: string): number {
  const val = EVENT_STATUS[inp.toUpperCase()];

  return val !== undefined ? val : -1;
}

/**
 * Get the User Event Status from the display value
 */
export function getUserEventStatus(inp: string): number {
  if (inp.toLowerCase().includes('not')) {
    return USER_EVENT_STATUS.NO;
  }

  const val = USER_EVENT_STATUS[inp.toUpperCase()];

  return val !== undefined ? val : -1;
}

/**
 * Get the Event Type label from the value
 */
export function getEventTypeLabel(inp: number): string {
  const val = EVENT_TYPE_LABELS[inp];

  return val !== undefined ? val : EVENT_TYPE_LABELS[0];
}

/**
 * Get the Event Status label from the value
 */
export function getEventStatusLabel(inp: number): string {
  const val = EVENT_STATUS_LABELS[inp];

  return val !== undefined ? val : EVENT_STATUS_LABELS[2];
}

/**
 * Get the User Event Status label from the value
 */
export function getUserEventStatusLabel(inp: number): string {
  const val = USER_EVENT_STATUS_LABELS[inp];

  return val !== undefined ? val : USER_EVENT_STATUS_LABELS[4];
}

export interface EventType {
  address: string;
  category: string[];
  createdBy: {
    email: string;
    name: string;
  };
  createdOn: number;
  desc: string;
  eid: string;
  end: number;
  fee: number;
  lastUpdated: number;
  name: string;
  photoURL: string;
  start: number;
  status: number;
  type: number;
  capacity: number;
}

export interface EventUserType {
  eid: string;
  status: number;
  uid: string;
  name: string;
  photoURL: string;
  paid: boolean;
  checkedIn: boolean;
  fee: number;
}

export class EventModel {
  address = '';
  category: string[] = [];
  createdByEmail = '';
  createdByName = '';
  createdOn = 0;
  desc = '';
  eid = '';
  end = 0;
  fee = 0;
  lastUpdated = 0;
  name = '';
  photoURL = '';
  start = 0;
  status = EVENT_STATUS.CANCELLED;
  type = EVENT_TYPE.PRIVATE;
  capacity = 0;

  constructor(event?: EventType) {
    if (event) {
      this.address = event.address;
      this.category = event.category;
      this.createdByEmail = event.createdBy.email;
      this.createdByName = event.createdBy.name;
      this.createdOn = event.createdOn;
      this.desc = event.desc;
      this.eid = event.eid;
      this.end = event.end;
      this.fee = event.fee;
      this.lastUpdated = event.lastUpdated;
      this.name = event.name;
      this.photoURL = event.photoURL;
      this.start = event.start;
      this.status = event.status;
      this.type = event.type;
      this.capacity = event.capacity;
    }
  }

  isEventPublic(): boolean {
    return this.type === EVENT_TYPE.PUBLIC;
  }

  isEventPrivate(): boolean {
    return this.type === EVENT_TYPE.PRIVATE;
  }

  isEventActive(): boolean {
    return this.status === EVENT_STATUS.ACTIVE;
  }

  isEventPostponed(): boolean {
    return this.status === EVENT_STATUS.POSTPONED;
  }

  isEventCancelled(): boolean {
    return this.status === EVENT_STATUS.CANCELLED;
  }
}

export class UserEventModel extends EventModel {
  eventUserStatus = USER_EVENT_STATUS.NO;
  paid = false;
  checkedIn = false;
  fee = 0;

  constructor(event?: EventType, user?: EventUserType) {
    super(event);

    if (user) {
      this.eventUserStatus = user.status;
      this.paid = user.paid;
      this.checkedIn = user.checkedIn;
      this.fee = user.fee;
    }
  }

  isUserHost(): boolean {
    return this.eventUserStatus === USER_EVENT_STATUS.HOST;
  }

  isUserYes(): boolean {
    return this.eventUserStatus === USER_EVENT_STATUS.ATTENDING;
  }

  isUserMaybe(): boolean {
    return this.eventUserStatus === USER_EVENT_STATUS.MAYBE;
  }

  isUserNo(): boolean {
    return this.eventUserStatus === USER_EVENT_STATUS.NO;
  }

  isUserInvited(): boolean {
    return this.eventUserStatus === USER_EVENT_STATUS.INVITED;
  }

  hasUserPaid(): boolean {
    return this.paid;
  }
}

export class EventsModel {
  // This is the selected event ID
  selectedEvent: string = '';

  // These are the public events
  events: GenericDataMap<string, EventModel> = new GenericDataMap();

  // These are the events the user is a part of (Host, Yes, Maybe, No)
  userEvents: GenericDataMap<string, UserEventModel> = new GenericDataMap();
}
