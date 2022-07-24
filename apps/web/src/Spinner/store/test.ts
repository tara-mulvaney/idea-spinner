import { createSpinnerStore, SpinnerStoreMutations } from ".";
import { expect, test } from "@jest/globals";

const { SPIN, ADVANCE, LOCK, UNLOCK } = SpinnerStoreMutations;

test.concurrent(`SpinnerStore - ${SPIN}`, async () => {
  const store = createSpinnerStore({
    wheels: new Map(),
  });

  store.commit(SPIN, {
    endingFrameLength: 0,
    friction: 0,
    startingFrameLength: 0,
  });

  expect(store.state.spinner.spins.size).toBe(1);
  expect(store.state.isSpinning).toBeTruthy();
  expect(store.getters.wheelCount).toBe(0);
});

test.concurrent(`SpinnerStore - ${ADVANCE}`, async () => {
  const store = createSpinnerStore({
    defaultPhysics: {
      endingFrameLength: 1000,
      friction: 1,
      startingFrameLength: 100,
    },
    wheels: new Map([["wheel1", ["option1"]]]),
  });

  store.commit(SPIN);
  store.commit(ADVANCE, 100);

  expect(store.getters.spinnerWheelProps).toHaveLength(1);
});

test.concurrent(`SpinnerStore - ${ADVANCE} requires ${SPIN}`, async () => {
  const store = createSpinnerStore({
    wheels: new Map([["wheel1", ["option1"]]]),
  });

  expect(() => store.commit(ADVANCE, 100)).toThrow();
});

test.concurrent(`SpinnerStore - spinnerWheelProps before ${SPIN}`, async () => {
  const store = createSpinnerStore({
    wheels: new Map([["wheel1", ["option1"]]]),
  });

  expect(store.getters.spinnerWheelProps).toEqual([
    {
      isLocked: false,
      isSpinning: false,
      name: "wheel1",
    },
  ]);
});

test.concurrent(
  `SpinnerStore - spinnerWheelProps if ${SPIN} deleted`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]]),
    });

    store.commit(SPIN, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0,
    });

    store.state.spinner.spins.clear();

    expect(store.getters.spinnerWheelProps).toEqual([
      {
        isLocked: false,
        isSpinning: false,
        name: "wheel1",
      },
    ]);
  }
);

test.concurrent(
  `SpinnerStore - getter.currentSpin empty before ${SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]]),
    });

    expect(store.getters.currentSpin).toBeUndefined();
  }
);

test.concurrent(`SpinnerStore - ${LOCK}`, async () => {
  const store = createSpinnerStore({
    defaultPhysics: {
      endingFrameLength: 1000,
      friction: 1,
      startingFrameLength: 100,
    },
    wheels: new Map([["wheel1", ["option1", "option2"]]]),
  });

  store.commit(SPIN);

  const wheel = store.getters.currentSpin?.wheels.get("wheel1");
  const wheelValue = wheel?.value;

  store.commit(LOCK, wheel);
  store.commit(ADVANCE, 100);

  expect(store.getters.lockedWheelCount).toBe(1);
  expect(store.state.lockedWheelValues.wheel1).toBe(wheelValue);

  expect(store.getters.spinnerWheelProps).toEqual([
    {
      isLocked: true,
      isSpinning: true,
      name: "wheel1",
      value: wheelValue,
    },
  ]);
});

test.concurrent(`SpinnerStore - ${UNLOCK}`, async () => {
  const store = createSpinnerStore({
    defaultPhysics: {
      endingFrameLength: 1000,
      friction: 1,
      startingFrameLength: 100,
    },
    wheels: new Map([["wheel1", ["option1", "option2"]]]),
  });

  store.commit(SPIN);

  const wheel = store.getters.currentSpin?.wheels.get("wheel1");
  const wheelValue = wheel?.value;

  store.commit(LOCK, wheel);
  store.commit(ADVANCE, 100);

  store.commit(UNLOCK, wheel);
  store.commit(ADVANCE, 200);

  expect(store.getters.lockedWheelCount).toBe(0);
  expect(store.state.lockedWheelValues.wheel1).not.toBe(wheelValue);
});
