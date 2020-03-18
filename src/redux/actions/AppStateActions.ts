import { Action } from 'redux';

export const APP_STATE_ACTION_CONSTANTS = {
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_ROUTE: 'SET_ROUTE',
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
