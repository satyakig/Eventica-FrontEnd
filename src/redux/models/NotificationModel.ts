import moment from 'moment-timezone';
import { v4 } from 'uuid';

moment.tz.setDefault(moment.tz.guess());

export type SeverityType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  message: string;
  severity: SeverityType;
}

export class NotificationModel {
  id = v4();
  message = '';
  timestamp = moment().valueOf();
  severity: SeverityType = 'info';

  constructor(notification?: Notification) {
    if (notification) {
      this.message = notification.message;
      this.severity = notification.severity as SeverityType;
    }
  }
}
