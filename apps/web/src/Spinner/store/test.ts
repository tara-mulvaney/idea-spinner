import {
  createSpinnerStore,
  SpinnerStoreMutations
} from ".";
import { expect, test } from "@jest/globals";

test.concurrent(`SpinnerStore - ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map()
    });

    store.commit(SpinnerStoreMutations.SPIN, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0
    });

    expect(store.state.spinner.spins.size).toBe(1);
    expect(store.state.isSpinning).toBeTruthy();
    expect(store.getters.wheelCount).toBe(0);
  }
);

test.concurrent(`SpinnerStore - ${SpinnerStoreMutations.ADVANCE}`,
  async () => {
    const store = createSpinnerStore({
      defaultPhysics: {
        endingFrameLength: 1000,
        friction: 1,
        startingFrameLength: 100
      },
      wheels: new Map([["wheel1", ["option1"]]])
    });

    store.commit(SpinnerStoreMutations.SPIN);
    store.commit(SpinnerStoreMutations.ADVANCE, 100);

    expect(
      store.getters.spinnerWheelProps
    ).toHaveLength(1);
  }
);

test.concurrent(
  `SpinnerStore - ${SpinnerStoreMutations.ADVANCE
  } requires ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]])
    });

    expect(
      () => store.commit(SpinnerStoreMutations.ADVANCE, 100)
    ).toThrow();
  }
);

test.concurrent(
  `SpinnerStore - spinnerWheelProps before ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]])
    });

    expect(
      store.getters.spinnerWheelProps
    ).toEqual([{
      isLocked: false,
      isSpinning: false,
      name: "wheel1"
    }]);
  }
);

test.concurrent(
  `SpinnerStore - spinnerWheelProps if ${SpinnerStoreMutations.SPIN} deleted`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]])
    });

    store.commit(SpinnerStoreMutations.SPIN, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0
    });

    store.state.spinner.spins.clear();

    expect(
      store.getters.spinnerWheelProps
    ).toEqual([{
      isLocked: false,
      isSpinning: false,
      name: "wheel1"
    }]);
  }
);

test.concurrent(
  `SpinnerStore - getter.currentSpin empty before ${SpinnerStoreMutations.SPIN
  }`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]])
    });

    expect(store.getters.currentSpin).toBeUndefined();
  }
);

test.concurrent(
  `SpinnerStore - ${SpinnerStoreMutations.LOCK}`,
  async () => {
    const store = createSpinnerStore({
      defaultPhysics: {
        endingFrameLength: 1000,
        friction: 1,
        startingFrameLength: 100
      },
      wheels: new Map([["wheel1", ["option1", "option2"]]])
    });

    store.commit(SpinnerStoreMutations.SPIN);

    const wheel = store.getters.currentSpin?.wheels.get("wheel1");
    const wheelValue = wheel?.value;

    store.commit(SpinnerStoreMutations.LOCK, wheel);
    store.commit(SpinnerStoreMutations.ADVANCE, 100);

    expect(store.getters.lockedWheelCount).toBe(1);
    expect(store.state.lockedWheelValues.wheel1).toBe(wheelValue);

    expect(
      store.getters.spinnerWheelProps
    ).toEqual([{
      isLocked: true,
      isSpinning: true,
      name: "wheel1",
      value: wheelValue
    }]);
  }
);

test.concurrent(
  `SpinnerStore - ${SpinnerStoreMutations.UNLOCK}`,
  async () => {
    const store = createSpinnerStore({
      defaultPhysics: {
        endingFrameLength: 1000,
        friction: 1,
        startingFrameLength: 100
      },
      wheels: new Map([["wheel1", ["option1", "option2"]]])
    });

    store.commit(SpinnerStoreMutations.SPIN);

    const wheel = store.getters.currentSpin?.wheels.get("wheel1");
    const wheelValue = wheel?.value;

    store.commit(SpinnerStoreMutations.LOCK, wheel);
    store.commit(SpinnerStoreMutations.ADVANCE, 100);

    store.commit(SpinnerStoreMutations.UNLOCK, wheel);
    store.commit(SpinnerStoreMutations.ADVANCE, 200);

    expect(store.getters.lockedWheelCount).toBe(0);
    expect(store.state.lockedWheelValues.wheel1).not.toBe(wheelValue);
  }
);
