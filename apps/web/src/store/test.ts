import { AppGetters } from "./types";
import createStore from ".";
import { SpinnerMutations } from "./spinner";
import { expect, test } from "@jest/globals";

const { SPIN, ADVANCE } = SpinnerMutations;

test.concurrent(`hashPersistancePlugin - load`, async () => {
  const targetObject = [{ name: "wheel1", value: "option1" }];

  window.location.hash = window.btoa(JSON.stringify(targetObject));

  const store = createStore({
    spinner: {
      defaultPhysics: {
        endingFrameLength: 0,
        friction: 0,
        startingFrameLength: 0,
      },
      wheels: new Map([["wheel1", ["option1"]]]),
    },
  });
  const storeGetters = store.getters as AppGetters;

  expect(storeGetters.spinnerWheelProps).toEqual(targetObject);
});

test.concurrent(`hashPersistancePlugin - save`, async () => {
  const store = createStore({
    spinner: {
      defaultPhysics: {
        endingFrameLength: 0,
        friction: 0,
        startingFrameLength: 0,
      },
      wheels: new Map([["wheel1", ["option1"]]]),
    },
  });

  store.commit(`spinner/${SPIN}`);
  store.commit(`spinner/${ADVANCE}`, Number.MAX_SAFE_INTEGER);

  expect(window.location.hash).toBe(
    `#${window.btoa(JSON.stringify([{ name: "wheel1", value: "option1" }]))}`
  );
});

test.concurrent(`SpinnerMutations - spinner/${SPIN}`, async () => {
  const store = createStore({
    spinner: {
      wheels: new Map(),
    },
  });
  const storeGetters = store.getters as AppGetters;
  const spinnerState = store.state.spinner;

  store.commit(`spinner/${SPIN}`, {
    endingFrameLength: 0,
    friction: 0,
    startingFrameLength: 0,
  });

  expect(spinnerState.spinner.spins.size).toBe(1);
  expect(spinnerState.isSpinning).toBeTruthy();
  expect(storeGetters.wheelCount).toBe(0);
});

test.concurrent(`SpinnerMutations - spinner/${ADVANCE}`, async () => {
  const store = createStore({
    spinner: {
      defaultPhysics: {
        endingFrameLength: 1000,
        friction: 1,
        startingFrameLength: 100,
      },
      wheels: new Map([["wheel1", ["option1"]]]),
    },
  });
  const storeGetters = store.getters as AppGetters;

  store.commit(`spinner/${SPIN}`);
  store.commit(`spinner/${ADVANCE}`, 100);

  expect(storeGetters.spinnerWheelProps).toHaveLength(1);
});

test.concurrent(
  `SpinnerMutations - spinner/${ADVANCE} requires spinner/${SPIN}`,
  async () => {
    const store = createStore({
      spinner: {
        wheels: new Map([["wheel1", ["option1"]]]),
      },
    });

    expect(() => store.commit(`spinner/${ADVANCE}`, 100)).toThrow();
  }
);

test.concurrent(
  `SpinnerMutations - spinnerWheelProps before spinner/${SPIN}`,
  async () => {
    const store = createStore({
      spinner: {
        wheels: new Map([["wheel1", ["option1"]]]),
      },
    });
    const storeGetters = store.getters as AppGetters;

    expect(storeGetters.spinnerWheelProps).toEqual([
      {
        isLocked: false,
        isSpinning: false,
        name: "wheel1",
      },
    ]);
  }
);

test.concurrent(
  `SpinnerMutations - spinnerWheelProps if spinner/${SPIN} deleted`,
  async () => {
    const store = createStore({
      spinner: {
        wheels: new Map([["wheel1", ["option1"]]]),
      },
    });
    const storeGetters = store.getters as AppGetters;
    const spinnerState = store.state.spinner;

    store.commit(`spinner/${SPIN}`, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0,
    });

    spinnerState.spinner.spins.clear();

    expect(storeGetters.spinnerWheelProps).toEqual([
      {
        isLocked: false,
        isSpinning: false,
        name: "wheel1",
      },
    ]);
  }
);

test.concurrent(
  `SpinnerMutations - getter.currentSpin empty before spinner/${SPIN}`,
  async () => {
    const store = createStore({
      spinner: {
        wheels: new Map([["wheel1", ["option1"]]]),
      },
    });
    const storeGetters = store.getters as AppGetters;

    expect(storeGetters.currentSpin).toBeUndefined();
  }
);
