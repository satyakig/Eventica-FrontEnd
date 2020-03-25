import { Action } from 'redux';

export const APP_STATE_ACTION_CONSTANTS = {
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SEARCHING: 'SET_SEARCHING',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_ROUTE: 'SET_ROUTE',
  REQUEST_EXECUTING: 'REQUEST_EXECUTING',
};

export type SetSearchTermActionType = {
  searchTerm: string;
} & Action;

export type SetCategoriesActionType = {
  categories: any;
} & Action;

export type SetRouteActionType = {
  route: string;
} & Action;

export type SetRequestExecutingAction = {
  state: boolean;
} & Action;

export function setSearchTermAction(searchTerm: string): SetSearchTermActionType {
  return {
    type: APP_STATE_ACTION_CONSTANTS.SET_SEARCH_TERM,
    searchTerm,
  };
}

export function setCategoriesAction(categories: any): SetCategoriesActionType {
  return {
    type: APP_STATE_ACTION_CONSTANTS.SET_CATEGORIES,
    categories,
  };
}

export function setRouteAction(route: string): SetRouteActionType {
  return {
    type: APP_STATE_ACTION_CONSTANTS.SET_ROUTE,
    route,
  };
}

export function setRequestExecutingAction(state: boolean): SetRequestExecutingAction {
  return {
    type: APP_STATE_ACTION_CONSTANTS.REQUEST_EXECUTING,
    state,
  };
}

export function setSearching(state: boolean): SetRequestExecutingAction {
  return {
    type: APP_STATE_ACTION_CONSTANTS.SET_SEARCHING,
    state,
  };
}
