import {
  createSpinnerStore,
  SpinnerStoreGetters,
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
      (store.getters as SpinnerStoreGetters).spinnerDisplay
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
  `SpinnerStore - spinnerDisplay before ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]])
    });

    expect(
      (store.getters as SpinnerStoreGetters).spinnerDisplay
    ).toEqual([{
      isSpinning: false,
      name: "wheel1",
      value: undefined,
    }]);
  }
);

test.concurrent(
  `SpinnerStore - spinnerDisplay if ${SpinnerStoreMutations.SPIN} deleted`,
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
      (store.getters as SpinnerStoreGetters).spinnerDisplay
    ).toEqual([{
      isSpinning: false,
      name: "wheel1",
      value: undefined,
    }]);
  }
);
