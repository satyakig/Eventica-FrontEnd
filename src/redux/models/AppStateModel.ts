export const HOMEPAGE = 'homepage';

export const MANAGE_EVENTS = 'manage_events';

export const ROUTES = [HOMEPAGE, MANAGE_EVENTS];

/**
 * Stores the metadata about the application
 */
export class AppStateModel {
  searchTerm = '';
  searching = false;
  categoriesArray: string[] = [];
  categoriesMap: Record<string, string> = {};
  route: string = HOMEPAGE;
  requestExecuting = false;
}
