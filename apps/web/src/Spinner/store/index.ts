import { createStore } from "vuex";
import { SpinnerWheelProps } from "../views/SpinnerWheel";
import {
  Spinner,
  SpinnerParameters,
  SpinnerPhysics
} from "@idea-spinner/spinner";

export interface SpinnerStoreState {
  currentSpinID?: string;
  isSpinning: boolean;
  spinner: Spinner;
}

// ISSUE #31: create utility for unified store typings
export interface SpinnerStoreGetters {
  spinnerDisplay: SpinnerWheelProps[];
}

export enum SpinnerStoreMutations {
  SPIN = "spinner/spin",
  ADVANCE = "spinner/advance"
}

export const createSpinnerStore =
  (parameters: SpinnerParameters) => {
    const spinner = new Spinner(parameters);

    return createStore<SpinnerStoreState>({
      getters: {
        spinnerDisplay(state): SpinnerWheelProps[] {
          const transformEntries = (
            entries: IterableIterator<[
              string,
              { value?: string | object; isSpinning?: boolean; }
            ]>
          ) =>
            Array.from(entries).map(([name, { value, isSpinning }]) => {
              if (value === undefined || typeof value === "string") {
                value = { value };
              }

              return {
                ...value,
                isSpinning: Boolean(isSpinning),
                name
              };
            });

          if (state.currentSpinID === undefined) {
            return transformEntries(
              state.spinner.parameters.wheels.entries() as IterableIterator<[
                string, object]>
            );
          }

          const currentSpinWheelEntries =
            state.spinner.getSpin(state.currentSpinID)?.wheels.entries();

          if (!currentSpinWheelEntries) {
            return transformEntries(
              state.spinner.parameters.wheels.entries() as IterableIterator<[
                string, object]>
            );
          }

          return transformEntries(currentSpinWheelEntries);
        }
      },
      mutations: {
        [SpinnerStoreMutations.SPIN](
          state: SpinnerStoreState,
          physics?: SpinnerPhysics
        ) {
          state.currentSpinID = state.spinner.createSpin(physics);
          state.isSpinning = true;
        },
        [SpinnerStoreMutations.ADVANCE](
          state: SpinnerStoreState,
          time: number
        ) {
          if (state.currentSpinID === undefined) {
            throw new TypeError(
              "You must SPIN the spinner store before ADVANCEing the spin!"
            );
          }

          state.spinner.advanceSpin(state.currentSpinID, time);
          state.isSpinning =
            Boolean(state.spinner.getSpin(state.currentSpinID)?.isSpinning);
        }
      },
      state() {
        return {
          isSpinning: false,
          spinner
        };
      }
    });
  };
