import { NotificationModel } from '../models/NotificationModel';
import {
  NOTIFICATION_ACTION_CONSTANTS,
  AddNotificationActionType,
  RemoveNotificationActionType,
} from '../actions/NotificationActions';

export const x = 1;

type ActionType = AddNotificationActionType & RemoveNotificationActionType;

export const NotificationReducer = (
  state: NotificationModel[] = [],
  action: ActionType,
): NotificationModel[] => {
  if (action.type === NOTIFICATION_ACTION_CONSTANTS.ADD_NOTIFICATION) {
    return state
      .concat([new NotificationModel(action.notification)])
      .sort((a: NotificationModel, b: NotificationModel) => {
        return a.timestamp - b.timestamp;
      });
  } else if (action.type === NOTIFICATION_ACTION_CONSTANTS.REMOVE_NOTIFICATION) {
    return state
      .filter((notification) => {
        return notification.id !== action.notificationId;
      })
      .sort((a: NotificationModel, b: NotificationModel) => {
        return a.timestamp - b.timestamp;
      });
  }

  return state;
};
