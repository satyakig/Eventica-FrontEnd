import { newState } from '../NewState';
import {
  APP_STATE_ACTION_CONSTANTS,
  SetCategoriesActionType,
  SetSearchTermActionType,
} from '../actions/AppStateActions';
import { AppStateModel } from '../models/AppStateModel';

type ActionType = SetSearchTermActionType & SetCategoriesActionType;

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

  return state;
};
