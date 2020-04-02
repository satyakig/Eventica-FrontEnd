import moment from 'moment-timezone';
import { v4 } from 'uuid';

moment.tz.setDefault(moment.tz.guess());

export type SeverityType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  uid: string;
  title: string;
  message: string;
  timestamp: number;
  success: boolean;
  seen: boolean;
}

export class NotificationModel {
  id = v4();
  title = '';
  message = '';
  timestamp = moment().valueOf();
  success = false;
  seen = false;
  severity: SeverityType = 'info';
  networkError = false;

  constructor(notification?: Notification) {
    if (notification) {
      this.id = notification.id;
      this.title = notification.title;
      this.message = notification.message;
      this.timestamp = notification.timestamp;
      this.success = notification.success;
      this.severity = notification.success ? 'success' : 'error';
      this.seen = notification.seen;
    }
  }
}
