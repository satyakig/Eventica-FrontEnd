import { EVENT_STATUS, EVENT_TYPE } from 'redux/models/EventModel';

export function isStringEmpty(value: string): boolean {
  return value.length === 0;
}

export function isNumberPositive(value: number): boolean {
  return value > 0;
}

export function isArrayEmpty(value: Array<any>): boolean {
  return value.length === 0;
}

export function isEventTypeValid(value: number): boolean {
  return value === EVENT_TYPE.PUBLIC || value === EVENT_TYPE.PRIVATE;
}

export function isEventStatusValid(value: number): boolean {
  return (
    value === EVENT_STATUS.ACTIVE ||
    value === EVENT_STATUS.POSTPONED ||
    value === EVENT_STATUS.CANCELLED
  );
}
