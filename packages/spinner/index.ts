import cuid from "cuid";
import { ShuffleQueue } from "./ShuffleQueue";

type Optional<T> = T | undefined;

// ISSUE #1: validate physics object
export interface SpinnerPhysics {
  startingFrameLength: number;
  endingFrameLength: number;
  friction: number;
}

/**
 * Simulates the spinning of a slot-machine-like object.
 * You can spin it multiple times simultaneously
 *  and poll for changes in real time.
 */
export class Spinner {
  parameters: { wheels: Map<string, string[]>; };
  spins: Map<string, Spin> = new Map();

  /**
   * The basic constructor.
   *
   * @param parameters
   * @param parameters.wheels The contents of each wheel in the spinner.
   *
   * @example
   * const spinner = new Spinner({ wheels:
   *   new Map([
   *     ["emotion", ["sad", "happy"]],
   *     ["color", ["red", "blue"]],
   *     ["length", ["long", "short"]]
   *   ])
   * });
   */
  constructor(parameters: { wheels: Map<string, string[]>; }) {
    this.parameters = parameters;
  }

  /**
   * Spins the spinner.
   *
   * @param physics The `physics` parameters allow you to customize
   *  the time between ticks on the spinner.
   * @returns The ID of the spin you've just started.
   *
   * @example
   * const spinID = spinner.spin({
   *   startingFrameLength: 300,
   *   endingFrameLength: 600,
   *   friction: 0.5
   * });
   */
  spin(physics: SpinnerPhysics) {
    const spinID = cuid();

    this.spins.set(spinID, new Spin({ ...this.parameters, physics }));

    return spinID;
  }

  /**
   * Polls a previously started spin to see what it says.
   *
   * @param spinID The ID of the spin you're polling.
   * @param timeOffset You can optionally provide a
   *  timeOffset to look into the future.
   * @returns What's shown on the Spinner at the current or future time.
   *
   * @example
   * spinner.getSpinStatus(spinID, 1000);
   */
  getSpinStatus(
    spinID: string,
    timeOffset?: number
  ): Optional<{ [wheelName: string]: string; }> {
    return this.spins.get(spinID)?.getStatus(timeOffset);
  }
}

/**
 * An ongoing spin of a set of simulated wheels.
 */
export class Spin {
  wheels: Map<string, Wheel> = new Map();

  /**
   * The basic constructor.
   *
   * @param parameters
   * @param parameters.wheels
   * @param parameters.physics
   *
   * @example
   * const spin = new Spin({
   *   wheels: new Map([
   *     ["emotion", ["sad", "happy"]],
   *     ["color", ["red", "blue"]],
   *     ["length", ["long", "short"]]
   *   ]),
   *   physics: {
   *     startingFrameLength: 300,
   *     endingFrameLength: 600,
   *     friction: 0.5
   *   }
   * });
   */
  constructor(parameters: {
    wheels: Map<string, string[]>,
    physics: SpinnerPhysics;
  }) {
    for (const [wheelName, wheelItems] of parameters.wheels) {
      this.wheels.set(
        wheelName,
        new Wheel({ items: wheelItems, physics: parameters.physics })
      );
    }
  }

  /**
   * Get the current display of this spin.
   *
   * @param timeOffset You can optionally provide a
   *  timeOffset to look into the future.
   * @returns The display of the Spin at the current or future time.
   *
   * @example
   * spin.getStatus(1000);
   */
  getStatus(timeOffset = 0) {
    const result: { [wheelName: string]: string; } = {};

    for (const [wheelName, wheel] of this.wheels) {
      result[wheelName] = wheel.getStatus(timeOffset);
    }

    return result;
  }
}

/**
 * Represents a wheel in a spin simulation.
 */
export class Wheel {
  physics: SpinnerPhysics;
  queue: ShuffleQueue<string>;

  private previousFrameLength: number;
  private previousCheckTime: number;
  private previousItem: string;

  /**
   * The basic constructor.
   *
   * @param parameters
   * @param parameters.items
   * @param parameters.physics
   *
   * @example
   * const wheel = new Wheel({
   *   items: [
   *     "happy",
   *     "sad"
   *   ],
   *   physics: {
   *     startingFrameLength: 300,
   *     endingFrameLength: 600,
   *     friction: 0.5
   *   }
   * });
   */
  constructor(parameters: { items: string[], physics: SpinnerPhysics; }) {
    this.queue = new ShuffleQueue<string>(parameters.items);
    this.physics = parameters.physics;

    this.previousFrameLength = this.physics.startingFrameLength;
    this.previousCheckTime = Date.now();
    this.previousItem = this.queue.randomItem;
  }

  /**
   * Get the current display of this wheel.
   *
   * @param timeOffset You can optionally provide a
   *  timeOffset to look into the future.
   * @returns The display of the Wheel at the current or future time.
   *
   * @example
   * wheel.getStatus(1000);
   */
  getStatus(timeOffset = 0) {
    const currentCheckTime = Date.now() + timeOffset;

    if (currentCheckTime > this.previousCheckTime + this.previousFrameLength) {
      // ISSUE #2: derive constant-time mathematical solution based on compound
      // interest formula
      do {
        this.previousCheckTime += this.previousFrameLength;
        this.previousFrameLength *= 1 + this.physics.friction;
      } while (this.previousCheckTime < currentCheckTime);

      this.previousItem = this.queue.randomItem;
    }

    return this.previousItem;
  }
}
