import { Action } from 'redux';

export const APP_STATE_ACTION_CONSTANTS = {
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
};

export type SetSearchTermActionType = {
  searchTerm: string;
} & Action;

export function setSearchTermAction(searchTerm: string): SetSearchTermActionType {
  return {
    type: APP_STATE_ACTION_CONSTANTS.SET_SEARCH_TERM,
    searchTerm,
  };
}
