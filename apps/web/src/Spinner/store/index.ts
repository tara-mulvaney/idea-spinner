import { SpinnerWheelProps } from "../views/SpinnerWheel";
import { createStore, Store } from "vuex";
import {
  Spin,
  Spinner,
  SpinnerParameters,
  SpinnerPhysics,
  Wheel,
  WheelItem
} from "@idea-spinner/spinner";

export interface SpinnerStoreState {
  currentSpinID?: string;
  lockedWheelValues: { [wheelName: string]: WheelItem; };
  isSpinning: boolean;
  spinner: Spinner;
}

export enum SpinnerStoreMutations {
  SPIN = "spinner/spin",
  ADVANCE = "spinner/advance",
  LOCK = "spinner/lock",
  UNLOCK = "spinner/unlock"
}

export interface SpinnerStoreStateWithGetters extends Store<SpinnerStoreState> {
  getters: {
    currentSpin: Spin | undefined;
    lockedWheelCount: number;
    spinnerWheelProps: SpinnerWheelProps[];
    wheelCount: number;
  };
}

const getNoSpinWheelProps = ({
  spinner: { parameters: { wheels } }
}: SpinnerStoreState): SpinnerWheelProps[] => {
  const result = [];

  for (const [name] of wheels.entries()) {
    result.push({
      isLocked: false,
      isSpinning: false,
      name
    });
  }

  return result;
};

const getLiveSpinWheelProps = (
  spin: Spin,
  lockedWheelValues: { [wheelName: string]: WheelItem; }
): SpinnerWheelProps[] => {
  const result = [];

  for (const [name, { value: rawValue, isSpinning }] of spin.wheels.entries()) {
    let [value, isLocked] = [rawValue, false];

    if (Boolean(lockedWheelValues[name])) {
      isLocked = true;
      value = lockedWheelValues[name];
    }

    if (typeof value === "string") {
      value = { value };
    }

    result.push({
      ...value,
      isLocked,
      isSpinning,
      name
    });
  }

  return result;
};

export const createSpinnerStore =
  (parameters: SpinnerParameters): SpinnerStoreStateWithGetters => {
    const spinner = new Spinner(parameters);

    return createStore<SpinnerStoreState>({
      getters: {
        currentSpin(state): Spin | undefined {
          return state.spinner.getSpin(state.currentSpinID ?? "");
        },
        lockedWheelCount(state): number {
          return Object.keys(state.lockedWheelValues).length;
        },
        spinnerWheelProps(state): SpinnerWheelProps[] {
          if (state.currentSpinID === undefined) {
            return getNoSpinWheelProps(state);
          }

          const currentSpin = state.spinner.getSpin(state.currentSpinID);

          if (!currentSpin) {
            return getNoSpinWheelProps(state);
          }

          return getLiveSpinWheelProps(currentSpin, state.lockedWheelValues);
        },
        wheelCount(state): number {
          return state.spinner.parameters.wheels.size;
        }
      },
      mutations: {
        [SpinnerStoreMutations.SPIN](
          state: SpinnerStoreState,
          physics?: SpinnerPhysics
        ) {
          state.currentSpinID = state.spinner.createSpin(physics).id;
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

          state.isSpinning = Boolean(
            state.spinner.advanceSpin(state.currentSpinID, time)?.isSpinning
          );
        },
        [SpinnerStoreMutations.LOCK](state: SpinnerStoreState, wheel: Wheel) {
          state.lockedWheelValues[wheel.name] = wheel.value;
        },
        [SpinnerStoreMutations.UNLOCK](
          state: SpinnerStoreState,
          wheel: Wheel
        ) {
          wheel.unsafeForceValue(state.lockedWheelValues[wheel.name]);

          delete state.lockedWheelValues[wheel.name];
        }
      },
      state() {
        return {
          isSpinning: false,
          lockedWheelValues: {},
          spinner
        };
      }
    });
  };
