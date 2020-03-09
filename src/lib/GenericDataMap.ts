import { newState } from 'redux/NewState';

/**
 * A typed generic class implementing dictionaries and maps
 * @template X Y
 * Keys are of type {X}
 * Values are of type {Y}
 */
export class GenericDataMap<X, Y> {
  private readonly map: Map<X, Y> = new Map<X, Y>();

  constructor(idProp: string = '', array: Y[] = []) {
    for (const y of array) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.set(y[idProp], y);
    }
  }

  /**
   * Updates a key value pair
   * @param id
   * @param data
   */
  public set(id: X, data: Y): void {
    this.map.set(id, data);
  }

  /**
   * Remove a key value pair
   * @param id
   */
  public remove(id: X): void {
    this.map.delete(id);
  }

  /**
   * @param id
   * @returns A key value pair
   */
  public get(id: X): Y | undefined {
    return this.map.get(id);
  }

  /**
   * @param id
   * @returns Whether the map contains the key provided
   */
  public has(id: X): boolean {
    return this.map.has(id);
  }

  /**
   * @returns Size of the map
   */
  public getSize(): number {
    return this.map.size;
  }

  /**
   * @returns All the keys in the map
   */
  public getAllIds(): X[] {
    return Array.from(this.map.keys());
  }

  /**
   * @returns Get all the data in the map
   */
  public getAllData(): Y[] {
    return Array.from(this.map.values());
  }

  /**
   * Clears the contents of the map
   */
  public clearData(): void {
    this.map.clear();
  }

  /**
   * @returns Shallow clone the map
   */
  public clone(): GenericDataMap<X, Y> {
    return newState(this, {});
  }
}
