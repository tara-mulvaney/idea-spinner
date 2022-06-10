import cuid from "cuid";
import { ShuffleQueue } from "./ShuffleQueue";

// ISSUE #1: validate physics object
export interface SpinnerPhysics {
  startingFrameLength: number;
  endingFrameLength: number;
  friction: number;
  variance?: number;
}

/**
 * Simulates the spinning of a slot-machine-like object.
 * It can manage multiple spins simultaneously.
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
   *  the spacing between changes on the spinner. Note that the
   *  units you use in this object will carry through the spin instance.
   * @returns The ID of the spin you've just started.
   *
   * @example
   * ```js
   * const spinID = spinner.createSpin({
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

  /**
   * Gets a previously started spin object.
   *
   * @param spinID
   * @returns The Spin object.
   *
   * @example
   * ```js
   * const spinObject = spinner.getSpin(spinID);
   * ```
   */
  getSpin(spinID: string) {
    return this.spins.get(spinID);
  }

  /**
   * Advances a previously started spin.
   *
   * @param spinID The ID of the spin you're polling.
   * @param time How much further you're advancing the spinner.
   * The units should be the same as those in the physics object.
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
 * for handling the variance in physics across the wheels, if any.
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
      const {
        endingFrameLength,
        startingFrameLength,
        variance
      } = parameters.physics;

      const physics = variance !== undefined ? {
        ...parameters.physics,
        endingFrameLength:
          endingFrameLength * variance * (Math.random() << 1 + 1),
        startingFrameLength:
          startingFrameLength * variance * (Math.random() << 1 + 1),
      } : parameters.physics;

      this.wheels.set(
        wheelName,
        new Wheel({ items: wheelItems, physics })
      );
    }
  }

  /**
   * Whether or not the Spin object is still spinning.
   *
   * @returns True or false.
   */
  get isSpinning() {
    return [...this.wheels.values()].some(wheel => wheel.isSpinning);
  }

  /**
   * Advances the spin object.
   *
   * @param time How much further you're advancing the spinner.
   * The units should be the same as those in the physics object.
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

  /**
   * The currently selected value on the Wheel.
   *
   * @returns The current message.
   */
  get value() {
    return this.previousItem;
  }

  /**
   * Whether or not this Wheel is still spinning.
   *
   * @returns True or false.
   */
  get isSpinning() {
    return this.previousFrameLength <= this.physics.endingFrameLength;
  }

  /**
   * Advances the wheel forward in the simulation.
   *
   * @param time How much further the wheel is being advanced.
   * The units should be the same as those in the physics object.
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
