import { NotificationModel } from '../models/NotificationModel';
import {
  NOTIFICATION_ACTION_CONSTANTS,
  SetNotificationsActionType,
} from '../actions/NotificationActions';

type ActionType = SetNotificationsActionType;

export const NotificationReducer = (
  state: NotificationModel[] = [],
  action: ActionType,
): NotificationModel[] => {
  if (action.type === NOTIFICATION_ACTION_CONSTANTS.SET_NOTIFICATIONS) {
    return action.notifications
      .map((notif) => {
        return new NotificationModel(notif);
      })
      .sort((a: NotificationModel, b: NotificationModel) => {
        return b.timestamp - a.timestamp;
      });
  }

  return state;
};
