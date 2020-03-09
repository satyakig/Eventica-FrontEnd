import { combineReducers } from 'redux';
import { UserReducer } from './reducers/UserReducer';
import { User } from './models/UserModel';
import { EventsReducer } from './reducers/EventsReducer';
import { EventsModel } from './models/EventModel';

export interface ReduxState {
  userReducer: User;
  eventsReducer: EventsModel;
}

const combinedReducer = combineReducers({
  userReducer: UserReducer,
  eventsReducer: EventsReducer,
});

export default combinedReducer;
