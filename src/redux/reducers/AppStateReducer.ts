import { newState } from '../NewState';
import { APP_STATE_ACTION_CONSTANTS, SetSearchTermActionType } from '../actions/AppStateActions';
import { AppStateModel } from '../models/AppState';

type ActionType = SetSearchTermActionType;

export const AppStateReducer = (
  state: AppStateModel = new AppStateModel(),
  action: ActionType,
): AppStateModel => {
  if (action.type === APP_STATE_ACTION_CONSTANTS.SET_SEARCH_TERM) {
    return newState(state, {
      searchTerm: action.searchTerm,
    });
  }

  return state;
};
