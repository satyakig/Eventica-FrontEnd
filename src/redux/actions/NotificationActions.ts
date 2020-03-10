import { Action } from 'redux';
import { Notification, SeverityType } from '../models/NotificationModel';

export const NOTIFICATION_ACTION_CONSTANTS = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

export type AddNotificationActionType = {
  notification: Notification;
} & Action;

export type RemoveNotificationActionType = {
  notificationId: string;
} & Action;

export function addNotificationAction(
  message: string,
  severity: SeverityType,
): AddNotificationActionType {
  const notification: Notification = {
    message,
    severity,
  };

  return {
    type: NOTIFICATION_ACTION_CONSTANTS.ADD_NOTIFICATION,
    notification,
  };
}

export function removeNotificationAction(notificationId: string): RemoveNotificationActionType {
  return {
    type: NOTIFICATION_ACTION_CONSTANTS.REMOVE_NOTIFICATION,
    notificationId,
  };
}
