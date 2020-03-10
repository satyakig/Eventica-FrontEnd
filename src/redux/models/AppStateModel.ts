/**
 * Stores the metadata about the application
 */
export class AppStateModel {
  searchTerm = '';
  categoriesArray: string[] = [];
  categoriesMap: Record<string, string> = {};
}
