import { CreateEventType } from '../lib/EventRequests';
import { isStringEmpty, isNumberPositive, isArrayEmpty } from '../validation/BasicValidation';

export function isValidEvent(event: CreateEventType): boolean {
  const { name, address, category, photoURL, desc, start, end, fee, type, capacity } = event;

  const validName = !isStringEmpty(name);
  const validAddress = !isStringEmpty(address);
  const validCategory = !isArrayEmpty(category);
  const validPhoto = !isStringEmpty(photoURL);
  const validDesc = !isStringEmpty(desc);
  const validStartDate = isNumberPositive(start);
  const validEndDate = isNumberPositive(end);
  const endDateIsAfterStartDate = end - start > 0;
  const validFee = isNumberPositive(fee);
  const validType = isNumberPositive(type);
  const validCapacity = isNumberPositive(capacity);

  const eventCheck =
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
    validCapacity;

  return eventCheck;
}
