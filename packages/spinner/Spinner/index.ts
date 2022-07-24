import cuid from "cuid";
import { ShuffleQueue } from "./ShuffleQueue";

export interface SpinnerParameters<T = WheelItem> {
  wheels: WheelSet<T>;
  defaultPhysics?: SpinnerPhysics;
}

// ISSUE #1: validate physics object
export interface SpinnerPhysics {
  startingFrameLength: number;
  endingFrameLength: number;
  friction: number;
  variance?: number;
}

export type WheelSet<T> = Map<string, T[]>;
export type WheelItem = string | { [property: string]: string };

/**
 * Simulates the spinning of a slot-machine-like object.
 * It can manage multiple spins simultaneously.
 */
export class Spinner<T = WheelItem> {
  parameters: SpinnerParameters<T>;
  spins: Map<string, Spin<T>> = new Map();

  /**
   * The basic constructor.
   *
   * @param parameters
   * @param parameters.wheels The contents of each wheel in the spinner.
   * @param parameters.defaultPhysics If no physics are provided for
   * a given spin, this is the physics object that will be used.
   *
   * @example
   * ```js
   * const spinner = new Spinner({ wheels:
   *   new Map([
   *     ["emotion", ["sad", "happy"]],
   *     ["color", ["red", { value: "blue", description: "the sad color" }]],
   *     ["length", ["long", "short"]]
   *   ])
   * });
   * ```
   */
  constructor(parameters: SpinnerParameters<T>) {
    this.parameters = parameters;
  }

  /**
   * Spins the spinner.
   *
   * @param physics The `physics` parameters allow you to customize
   *  the spacing between changes on the spinner. Note that the
   *  units you use in this object will carry through the spin instance.
   *
   * @throws {TypeError} Will throw if no physics object is found.
   *
   * @returns The spin you've just started.
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
  createSpin(physics?: SpinnerPhysics) {
    if (!(this.parameters.defaultPhysics || physics)) {
      throw new TypeError(
        "No physics provided for Spin - " +
          "please provide a physics object to `createSpin` " +
          "or initialize the Spinner with a default physics object."
      );
    }

    const spinID = cuid();
    const spin = new Spin<T>({
      ...this.parameters,
      id: spinID,
      physics: (physics ?? this.parameters.defaultPhysics) as SpinnerPhysics,
    });

    this.spins.set(spinID, spin);

    return spin;
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
   * @returns The advanced spin object, for utility.
   *
   * @example
   * ```js
   * spinner.advanceSpin(spinID, 1000);
   * ```
   */
  advanceSpin(spinID: string, time: number) {
    const spin = this.spins.get(spinID);
    return spin?.advanceTime(time);
  }
}

const HALF = 2;
const randomlyOffsetValue = (value: number, variance: number) =>
  value * ((1 + Math.random() / HALF) * variance);

/**
 * An ongoing spin of a set of simulated wheels. Responsible
 * for handling the variance in physics across the wheels, if any.
 */
export class Spin<T = WheelItem> {
  id: string;
  wheels: Map<string, Wheel<T>> = new Map();

  /**
   * The basic constructor.
   *
   * @param parameters
   * @param parameters.id
   * @param parameters.wheels
   * @param parameters.physics
   *
   * @example
   * ```js
   * const spin = new Spin({
   *   id: "myID",
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
    id: string;
    wheels: WheelSet<T>;
    physics: SpinnerPhysics;
  }) {
    this.id = parameters.id;

    for (const [wheelName, wheelItems] of parameters.wheels.entries()) {
      const { endingFrameLength, startingFrameLength, variance } =
        parameters.physics;

      this.wheels.set(
        wheelName,
        new Wheel<T>({
          items: wheelItems,
          name: wheelName,
          physics:
            variance !== undefined
              ? {
                  ...parameters.physics,
                  endingFrameLength: randomlyOffsetValue(
                    endingFrameLength,
                    variance
                  ),
                  startingFrameLength: randomlyOffsetValue(
                    startingFrameLength,
                    variance
                  ),
                }
              : parameters.physics,
        })
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
   * @returns The current spin object, for utility
   *
   * @example
   * ```js
   * spin.advanceTime(1000);
   * ```
   */
  advanceTime(time: number) {
    for (const [, wheel] of this.wheels) {
      wheel.advanceTime(time);
    }

    return this;
  }
}

/**
 * Represents a wheel in a spin simulation.
 */
export class Wheel<T = WheelItem> {
  name: string;
  physics: SpinnerPhysics;
  queue: ShuffleQueue<T>;

  private clock: number;
  private previousFrameLength: number;
  private previousCheckTime: number;
  private previousItem: T;

  /**
   * The basic constructor.
   *
   * @param parameters
   * @param parameters.name
   * @param parameters.items
   * @param parameters.physics
   *
   * @example
   * ```js
   * const wheel = new Wheel({
   *   name: "my wheel",
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
  constructor(parameters: {
    name: string;
    items: T[];
    physics: SpinnerPhysics;
  }) {
    this.name = parameters.name;
    this.queue = new ShuffleQueue<T>(parameters.items);
    this.physics = parameters.physics;

    this.clock = 0;
    this.previousFrameLength = this.physics.startingFrameLength;
    this.previousCheckTime = 0;
    this.previousItem = this.queue.randomItem;
  }

  /**
   * The currently selected value on the Wheel.
   *
   * @returns The current wheel value.
   */
  get value(): T {
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
   * @returns This wheel, for utility.
   *
   * @example
   * ```js
   * wheel.advanceTime(1000);
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

    return this;
  }

  /**
   * THIS IS NOT RECOMMENDED - forcing the wheel value can cause issues,
   * namely the shuffle queue will not know of this. Make sure you know
   * what you're doing.
   *
   * @param value The value to set the wheel to.
   *
   * @example
   * ```js
   * wheel.unsafeForceValue("something dumb");
   * ```
   */
  unsafeForceValue(value: T) {
    this.previousItem = value;
  }
}
