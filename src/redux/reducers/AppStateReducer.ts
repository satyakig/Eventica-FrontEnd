import { newState } from '../NewState';
import {
  APP_STATE_ACTION_CONSTANTS,
  SetCategoriesActionType,
  SetSearchTermActionType,
  SetRouteActionType,
  SetRequestExecutingAction,
} from '../actions/AppStateActions';
import { AppStateModel, ROUTES } from '../models/AppStateModel';

type ActionType = SetSearchTermActionType &
  SetCategoriesActionType &
  SetRouteActionType &
  SetRequestExecutingAction;

export const AppStateReducer = (
  state: AppStateModel = new AppStateModel(),
  action: ActionType,
): AppStateModel => {
  if (action.type === APP_STATE_ACTION_CONSTANTS.SET_SEARCH_TERM) {
    return newState(state, {
      searchTerm: action.searchTerm,
    });
  }

  if (action.type === APP_STATE_ACTION_CONSTANTS.SET_CATEGORIES) {
    const array = action.categories.ARRAY;
    const catClone = { ...action.categories };
    delete catClone.ARRAY;

    return newState(state, {
      categoriesArray: array,
      categoriesMap: catClone,
    });
  }

  if (action.type === APP_STATE_ACTION_CONSTANTS.SET_ROUTE) {
    const route = action.route;

    if (ROUTES.includes(route)) {
      return newState(state, {
        route,
      });
    }
  }

  if (action.type === APP_STATE_ACTION_CONSTANTS.REQUEST_EXECUTING) {
    return newState(state, {
      requestExecuting: action.state,
    });
  }

  return state;
};
