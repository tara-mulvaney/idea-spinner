import { AppGetters } from "./types";
import createStore from ".";
import { SpinnerMutations } from "./spinner";
import { expect, test } from "@jest/globals";

const { SPIN, ADVANCE, STOP, OVERRIDE } = SpinnerMutations;

test.concurrent(`hashPersistancePlugin - load`, async () => {
  const targetObject = [
    { name: "notreal" },
    { name: "wheel1", value: "option1" },
    { description: "description", name: "wheel2", value: "option2" },
  ];

  window.location.hash = window.btoa(JSON.stringify(targetObject));

  const store = createStore({
    spinner: {
      defaultPhysics: {
        endingFrameLength: 0,
        friction: 0,
        startingFrameLength: 0,
      },
      wheels: new Map([
        ["wheel1", ["option1"]],
        ["wheel2", [{ description: "description", value: "option2" }]],
      ]),
    },
  });
  const storeGetters = store.getters as AppGetters;

  expect(
    storeGetters.spinnerWheelsProps.map(({ name, value }) => ({ name, value }))
  ).toEqual([
    { name: "wheel1", value: "option1" },
    { name: "wheel2", value: "option2" },
  ]);
});

test.concurrent(`hashPersistancePlugin - save`, async () => {
  window.location.hash = "";

  const store = createStore({
    spinner: {
      defaultPhysics: {
        endingFrameLength: 1000,
        friction: 1,
        startingFrameLength: 100,
      },
      wheels: new Map([
        ["wheel1", ["option1"]],
        ["wheel2", ["option2"]],
      ]),
    },
  });
  const storeGetters = store.getters as AppGetters;

  store.commit(`spinner/${SPIN}`);
  store.commit(`spinner/${OVERRIDE}`, {
    override: {
      isLocked: true,
      value: "option1",
    },
    wheel: storeGetters.currentSpin?.wheels.get("wheel1"),
  });
  store.commit(`spinner/${STOP}`);

  expect(window.location.hash).toBe(
    `#${window.btoa(
      JSON.stringify([
        { isLocked: true, name: "wheel1", value: "option1" },
        { name: "wheel2", value: "option2" },
      ])
    )}`
  );
});

test.concurrent(`SpinnerMutations - spinner/${SPIN}`, async () => {
  const store = createStore({
    spinner: {
      wheels: new Map(),
    },
  });
  const spinnerState = store.state.spinner;

  store.commit(`spinner/${SPIN}`, {
    endingFrameLength: 0,
    friction: 0,
    startingFrameLength: 0,
  });

  expect(spinnerState.spinner.spins.size).toBe(1);
  expect(spinnerState.isSpinning).toBeTruthy();
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

  expect(storeGetters.spinnerWheelsProps).toHaveLength(1);
});

test.concurrent(
  `SpinnerMutations - spinner/${ADVANCE} and ${STOP} require spinner/${SPIN}`,
  async () => {
    const store = createStore({
      spinner: {
        wheels: new Map([["wheel1", ["option1"]]]),
      },
    });

    expect(() => store.commit(`spinner/${ADVANCE}`, 100)).toThrow();
    expect(() => store.commit(`spinner/${STOP}`)).toThrow();
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

    expect(storeGetters.spinnerWheelsProps).toEqual([
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

    expect(storeGetters.spinnerWheelsProps).toEqual([
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

test.concurrent(`AppGetters - isSpinnerFullyLocked`, async () => {
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

  store.commit(`spinner/${OVERRIDE}`, {
    override: {
      isLocked: true,
      value: "option1",
    },
    wheel: storeGetters.currentSpin?.wheels.get("wheel1"),
  });

  expect(storeGetters.isSpinnerFullyLocked).toBe(true);
});
