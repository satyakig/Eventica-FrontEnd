import { Action } from 'redux';
import { Notification } from '../models/NotificationModel';

export const NOTIFICATION_ACTION_CONSTANTS = {
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
};

export type SetNotificationsActionType = {
  notifications: Notification[];
} & Action;

export function setNotificationsAction(notifications: Notification[]): SetNotificationsActionType {
  return {
    type: NOTIFICATION_ACTION_CONSTANTS.SET_NOTIFICATIONS,
    notifications,
  };
}
