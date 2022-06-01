import { createStore } from "vuex";
import { SpinnerWheelProps } from "../views/SpinnerWheel";
import { Spinner, SpinnerPhysics } from "@idea-spinner/spinner";

export interface SpinnerStoreState {
  display: SpinnerWheelProps[];
  isSpinning: boolean;
  spinner?: Spinner;
  currentSpinID?: string;
}

export enum SpinnerStoreMutations {
  INITIALIZE = "spinner/initialize",
  SPIN = "spinner/spin",
  ADVANCE = "spinner/advance"
}

export const SpinnerStore = createStore<SpinnerStoreState>({
  mutations: {
    [SpinnerStoreMutations.INITIALIZE](state, wheels: Map<string, string[]>) {
      state.spinner = new Spinner({ wheels });
      state.display = [...wheels.keys()].map(
        name => ({
          isSpinning: false,
          name,
          value: "--",
        })
      );
    },
    [SpinnerStoreMutations.SPIN](state, physics: SpinnerPhysics) {
      if (!state.spinner) {
        throw new TypeError(
          "You must INITIALIZE the spinner store before starting a spin!"
        );
      }

      state.currentSpinID = state.spinner.createSpin(physics);
      state.isSpinning = true;
    },
    [SpinnerStoreMutations.ADVANCE](state, time: number) {
      if (!state.spinner) {
        throw new TypeError(
          "You must INITIALIZE the spinner and then " +
          "SPIN it before ADVANCEing that spin!"
        );
      }

      if (state.currentSpinID === undefined) {
        throw new TypeError(
          "You must SPIN the spinner store before ADVANCEing the spin!"
        );
      }

      const spinObject = state.spinner.getSpin(state.currentSpinID);

      state.spinner.advanceSpin(state.currentSpinID, time);

      if (!spinObject) {
        return;
      }

      state.display = [...spinObject.wheels.entries()].map(
        ([name, { value, isSpinning }]) => ({ name, value, isSpinning })
      );
      state.isSpinning = spinObject.isSpinning;
    }
  },
  state() {
    return {
      isSpinning: false,
      display: []
    };
  }
});
