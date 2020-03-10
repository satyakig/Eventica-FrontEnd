import { combineReducers } from 'redux';
import { UserReducer } from './reducers/UserReducer';
import { User } from './models/UserModel';
import { EventsReducer } from './reducers/EventsReducer';
import { EventsModel } from './models/EventModel';
import { AppStateReducer } from './reducers/AppStateReducer';
import { AppStateModel } from './models/AppStateModel';
import { NotificationReducer } from './reducers/NotificationsReducer';
import { NotificationModel } from './models/NotificationModel';

export interface ReduxState {
  user: User;
  events: EventsModel;
  appState: AppStateModel;
  notifications: NotificationModel[];
}

const combinedReducer = combineReducers({
  user: UserReducer,
  events: EventsReducer,
  appState: AppStateReducer,
  notifications: NotificationReducer,
});

export default combinedReducer;
