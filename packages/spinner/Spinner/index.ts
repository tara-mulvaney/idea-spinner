import cuid from "cuid";
import { ShuffleQueue } from "./ShuffleQueue";

// ISSUE #1: validate physics object
export interface SpinnerPhysics {
  startingFrameLength: number;
  endingFrameLength: number;
  friction: number;
  variance: number;
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
   * ```js
   * const spinner = new Spinner({ wheels:
   *   new Map([
   *     ["emotion", ["sad", "happy"]],
   *     ["color", ["red", "blue"]],
   *     ["length", ["long", "short"]]
   *   ])
   * });
   * ```
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
   * ```js
   * const spinID = spinner.spin({
   *   startingFrameLength: 300,
   *   endingFrameLength: 600,
   *   friction: 0.5
   * });
   * ```
   */
  createSpin(physics: SpinnerPhysics) {
    const spinID = cuid();

    this.spins.set(spinID, new Spin({ ...this.parameters, physics }));

    return spinID;
  }

  getSpin(spinID: string) {
    return this.spins.get(spinID);
  }

  /**
   * Polls a previously started spin to see what it says.
   *
   * @param spinID The ID of the spin you're polling.
   * @param time You can optionally provide a
   *  advanceTime to look into the future.
   * @returns What's shown on the Spinner at the current or future time.
   *
   * @example
   * ```js
   * spinner.advanceSpin(spinID, 1000);
   * ```
   */
  advanceSpin(spinID: string, time: number) {
    this.spins.get(spinID)?.advanceTime(time);
  }
}

/**
 * An ongoing spin of a set of simulated wheels. Responsible
 * for handling the variance in physics across the wheels.
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
   * ```js
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
   * ```
   */
  constructor(parameters: {
    wheels: Map<string, string[]>,
    physics: SpinnerPhysics;
  }) {
    for (const [wheelName, wheelItems] of parameters.wheels) {
      const randomLength = (frameLength: number, variance: number) => {
        const coeff = frameLength * variance;

        return coeff * (2 * Math.random() + 1);
      };

      const physics = {
        ...parameters.physics,
        startingFrameLength: randomLength(parameters.physics.startingFrameLength, parameters.physics.variance),
        endingFrameLength: randomLength(parameters.physics.endingFrameLength, parameters.physics.variance)
      };

      this.wheels.set(
        wheelName,
        new Wheel({ items: wheelItems, physics })
      );
    }
  }

  get isSpinning() {
    return [...this.wheels.values()].some(wheel => wheel.isSpinning);
  }

  /**
   * Get the current display of this spin.
   *
   * @param time You can optionally provide an
   *  advanceTime to advance the spin into the future.
   * @returns The display of the Spin at the current or future time.
   *
   * @example
   * ```js
   * spin.getStatus(1000);
   * ```
   */
  advanceTime(time: number) {
    for (const [, wheel] of this.wheels) {
      wheel.advanceTime(time);
    }
  }
}

/**
 * Represents a wheel in a spin simulation.
 */
export class Wheel {
  physics: SpinnerPhysics;
  queue: ShuffleQueue<string>;

  private clock: number;
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
   * ```js
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
   * ```
   */
  constructor(parameters: { items: string[], physics: SpinnerPhysics; }) {
    this.queue = new ShuffleQueue<string>(parameters.items);
    this.physics = parameters.physics;

    this.clock = 0;
    this.previousFrameLength = this.physics.startingFrameLength;
    this.previousCheckTime = 0;
    this.previousItem = this.queue.randomItem;
  }

  get value() {
    return this.previousItem;
  }

  get isSpinning() {
    return this.previousFrameLength <= this.physics.endingFrameLength;
  }

  /**
   * Get the current display of this wheel.
   *
   * @param time You can optionally provide an
   *  advanceTime to advance the spinner into the future.
   * @returns The display of the Wheel at the current or future time.
   *
   * @example
   * ```js
   * wheel.getStatus(1000);
   * ```
   */
  advanceTime(time: number) {
    this.clock += time;

    if (!this.isSpinning) {
      return;
    }

    if (this.clock > this.previousCheckTime + this.previousFrameLength) {
      // ISSUE #2: derive constant-time mathematical solution based on compound
      // interest formula
      do {
        this.previousCheckTime += this.previousFrameLength;
        this.previousFrameLength *= 1 + this.physics.friction;
      } while (this.previousCheckTime < this.clock);

      this.previousItem = this.queue.randomItem;
    }
  }
}
