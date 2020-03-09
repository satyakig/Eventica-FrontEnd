import { GenericDataMap } from 'lib/GenericDataMap';

export const USER_EVENT_STATUS = { HOST: 0, ATTENDING: 1, MAYBE: 2, NO: 3 };

export const EVENT_STATUS = { ACTIVE: 0, POSTPONED: 1, CANCELLED: 2 };

export const EVENT_TYPE = {
  PUBLIC: 0,
  PRIVATE: 1,
};

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
}

export interface EventUserType {
  eid: string;
  status: number;
  uid: string;
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

  eventUserStatus = USER_EVENT_STATUS.NO;

  constructor(event?: EventType, user?: EventUserType) {
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
    }

    if (user) {
      this.eventUserStatus = user.status;
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
}

export class EventsModel {
  selectedEvent: string = '';
  events: GenericDataMap<string, EventModel> = new GenericDataMap();
}
