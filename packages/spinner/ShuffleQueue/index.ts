/**
 * Test!
 */
export class ShuffleQueue<T> {
  private previousItem?: T;
  private queue: T[] = [];
  private _inventory: T[] = [];

  constructor(inventory: T[] = []) {
    this.inventory = inventory;
  }

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

  set inventory(inventory: T[]) {
    this._inventory = inventory;
    this.queue = [...inventory];
  }
}
