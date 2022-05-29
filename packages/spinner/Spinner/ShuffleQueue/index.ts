/**
 * A queue of items from which the elements you take from it are randomly drawn.
 * Ensures you don't get the same element twice in a row.
 */
export class ShuffleQueue<T> {
  private previousItem?: T;
  private queue: T[] = [];
  private _inventory: T[] = [];

  /**
   * The basic constructor.
   *
   * @param inventory The inventory of elements to populate the queue.
   *
   * @example
   * ```js
   * new ShuffleQueue(["item1", "item2", "item3"]);
   * ```
   */
  constructor(inventory: T[] = []) {
    this.inventory = inventory;
  }

  /**
   * Retrieves a random item from the queue.
   * If there are none left, reshuffles the queue and draws from the new list.
   *
   * @returns A random item from the queue.
   */
  get randomItem(): T {
    let randomIndex: number;
    let randomElement: T;

    do {
      randomIndex = Math.round(Math.random() * this.queue.length - 1);
      randomElement = this.queue[randomIndex];
    } while (randomElement === this.previousItem);

    [this.previousItem] = this.queue.splice(randomIndex, 1);

    if (!this.queue.length) {
      this.queue = [...this._inventory];
    }

    return randomElement;
  }

  /**
   * Replace the inventory of items in the queue.
   */
  set inventory(inventory: T[]) {
    this._inventory = inventory;
    this.queue = [...inventory];
  }
}
