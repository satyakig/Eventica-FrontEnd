import { newState } from '../NewState';
import {
  APP_STATE_ACTION_CONSTANTS,
  SetCategoriesActionType,
  SetSearchTermActionType,
  SetRouteActionType,
  SetRequestExecutingAction,
  SetNetworkErrorAction,
} from '../actions/AppStateActions';
import { AppStateModel, ROUTES } from '../models/AppStateModel';

type ActionType = SetSearchTermActionType &
  SetCategoriesActionType &
  SetRouteActionType &
  SetRequestExecutingAction &
  SetNetworkErrorAction;

export const AppStateReducer = (
  state: AppStateModel = new AppStateModel(),
  action: ActionType,
): AppStateModel => {
  if (action.type === APP_STATE_ACTION_CONSTANTS.SET_SEARCH_TERM) {
    const currentlySearching = state.searching || action.searchTerm.length > 0;

    return newState(state, {
      searchTerm: action.searchTerm,
      searching: currentlySearching,
    });
  } else if (action.type === APP_STATE_ACTION_CONSTANTS.SET_CATEGORIES) {
    const array = action.categories.ARRAY;
    const catClone = { ...action.categories };
    delete catClone.ARRAY;

    return newState(state, {
      categoriesArray: array,
      categoriesMap: catClone,
    });
  } else if (action.type === APP_STATE_ACTION_CONSTANTS.SET_ROUTE) {
    const route = action.route;

    if (ROUTES.includes(route)) {
      return newState(state, {
        route,
      });
    }
  } else if (action.type === APP_STATE_ACTION_CONSTANTS.REQUEST_EXECUTING) {
    return newState(state, {
      requestExecuting: action.state,
    });
  } else if (action.type === APP_STATE_ACTION_CONSTANTS.SET_SEARCHING) {
    if (action.state) {
      return newState(state, {
        searching: true,
      });
    } else {
      return newState(state, {
        searchTerm: '',
        searching: false,
      });
    }
  } else if (action.type === APP_STATE_ACTION_CONSTANTS.NETWORK_ERROR) {
    return newState(state, {
      networkErrorMessage: action.networkErrorMessage,
    });
  }

  return state;
};
