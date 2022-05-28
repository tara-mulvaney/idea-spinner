import cuid from "cuid";
import { ShuffleQueue } from "./ShuffleQueue";

type Optional<T> = T | undefined;

// TODO: validate physics object
export interface SpinnerPhysics {
  startingFrameLength: number;
  endingFrameLength: number;
  friction: number;
}

export class Spinner {
  parameters: { wheels: Map<string, string[]>; };
  spins: Map<string, Spin> = new Map();

  constructor(parameters: { wheels: Map<string, string[]>; }) {
    this.parameters = parameters;
  }

  spin(physics: SpinnerPhysics) {
    const spinID = cuid();

    this.spins.set(spinID, new Spin({ ...this.parameters, physics }));

    return spinID;
  }

  getSpinStatus(
    spinID: string,
    timeOffset?: number
  ): Optional<{ [wheelName: string]: string; }> {
    return this.spins.get(spinID)?.getStatus(timeOffset);
  }
}

export class Spin {
  wheels: Map<string, Wheel> = new Map();

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

  getStatus(timeOffset = 0) {
    const result: { [wheelName: string]: string; } = {};

    for (const [wheelName, wheel] of this.wheels) {
      result[wheelName] = wheel.getStatus(timeOffset);
    }

    return result;
  }
}

export class Wheel {
  physics: SpinnerPhysics;
  queue: ShuffleQueue<string>;

  private previousFrameLength: number;
  private previousCheckTime: number;
  private previousItem: string;

  constructor(parameters: { items: string[], physics: SpinnerPhysics; }) {
    this.queue = new ShuffleQueue<string>(parameters.items);
    this.physics = parameters.physics;

    this.previousFrameLength = this.physics.startingFrameLength;
    this.previousCheckTime = Date.now();
    this.previousItem = this.queue.randomItem;
  }

  getStatus(timeOffset = 0) {
    const currentCheckTime = Date.now() + timeOffset;

    if (currentCheckTime > this.previousCheckTime + this.previousFrameLength) {
      // TODO: derive constant-time mathematical solution based on compound
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
