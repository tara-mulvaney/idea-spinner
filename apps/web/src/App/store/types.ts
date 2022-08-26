import { Spin } from "@idea-spinner/spinner";
import { SpinnerStoreState, SpinnerWheelProps } from "../modules/Spinner";

export interface AppState {
  spinner: SpinnerStoreState;
}

export interface AppGetters {
  currentSpin?: Spin;
  lockedWheelCount: number;
  spinnerWheelProps: SpinnerWheelProps[];
  wheelCount: number;
}
