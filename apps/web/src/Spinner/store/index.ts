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

export const SpinnerStore = {
  mutations: {
    [SpinnerStoreMutations.INITIALIZE](
      state: SpinnerStoreState,
      wheels: Map<string, string[]>
    ) {
      state.spinner = new Spinner({ wheels });
      state.display = [...wheels.keys()].map(
        name => ({
          isSpinning: false,
          name,

          // ISSUE #25:
          // refactor spinner store so it doesn't need initialization step
          // (this can be pulled from the spinner default physics)
          tickDuration: "200ms"
        })
      );
    },
    [SpinnerStoreMutations.SPIN](
      state: SpinnerStoreState,
      physics: SpinnerPhysics
    ) {
      if (!state.spinner) {
        throw new TypeError(
          "You must INITIALIZE the spinner store before starting a spin!"
        );
      }

      state.currentSpinID = state.spinner.createSpin(physics);
      state.isSpinning = true;
    },
    [SpinnerStoreMutations.ADVANCE](state: SpinnerStoreState, time: number) {
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

      if (!spinObject) {
        throw new RangeError(
          `SpinnerStore currentSpinID "${state.currentSpinID}" not found!`
        );
      }

      state.spinner.advanceSpin(state.currentSpinID, time);

      state.display = [...spinObject.wheels.entries()].map(
        ([name, { value: rawValue, isSpinning, physics }]) => {
          // ISSUE #28: 
          // support arbitrary objects as wheel items in the Spinner package
          const [value, description] = rawValue.split(/\s*[:-]\s*/);

          return {
            description,
            isSpinning,
            name,
            tickDuration: `${Math.floor(physics.startingFrameLength)}ms`,
            value
          };
        }
      );
      state.isSpinning = spinObject.isSpinning;
    }
  },
  state() {
    return {
      display: [],
      isSpinning: false
    };
  }
};

// ISSUE #25: refactor spinner store so it doesn't need initialization step
export const createSpinnerStore =
  () => createStore<SpinnerStoreState>(SpinnerStore);
