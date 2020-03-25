import moment from 'moment-timezone';
import { CreateEventType, UpdateEventType } from 'lib/EventRequests';
import {
  isArrayEmpty,
  isEventStatusValid,
  isEventTypeValid,
  isNumberPositive,
  isStringEmpty,
} from './BasicValidation';

export function isValidEvent(event: CreateEventType | UpdateEventType): boolean {
  const { name, address, category, photoURL, desc, start, end, fee, type, capacity } = event;

  const validName = !isStringEmpty(name);
  const validAddress = !isStringEmpty(address);
  const validCategory = !isArrayEmpty(category);
  const validPhoto = !isStringEmpty(photoURL);
  const validDesc = !isStringEmpty(desc);

  const validStartDate = isNumberPositive(start);
  const validEndDate = isNumberPositive(end) && end > start && end >= moment().valueOf();
  const endDateIsAfterStartDate = end - start > 0;
  const validFee = fee === 0 || isNumberPositive(fee);
  const validCapacity = isNumberPositive(capacity);

  const validType = isEventTypeValid(type);

  let validStatus = true;
  if ((event as UpdateEventType).status !== undefined) {
    validStatus = isEventStatusValid((event as UpdateEventType).status);
  }

  return (
    validName &&
    validAddress &&
    validCategory &&
    validPhoto &&
    validDesc &&
    validStartDate &&
    validEndDate &&
    endDateIsAfterStartDate &&
    validFee &&
    validType &&
    validCapacity &&
    validStatus
  );
}
