import { combineReducers } from 'redux';
import { UserReducer } from './reducers/UserReducer';
import { User } from './models/UserModel';
import { EventsReducer } from './reducers/EventsReducer';
import { EventsModel } from './models/EventModel';
import { AppStateReducer } from './reducers/AppStateReducer';
import { AppStateModel } from './models/AppState';

export interface ReduxState {
  userReducer: User;
  eventsReducer: EventsModel;
  appStateReducer: AppStateModel;
}

const combinedReducer = combineReducers({
  userReducer: UserReducer,
  eventsReducer: EventsReducer,
  appStateReducer: AppStateReducer,
});

export default combinedReducer;
