import { Spin } from "@idea-spinner/spinner";
import { SpinnerState } from "./spinner";
import { SpinnerWheelProps } from "../components";

export interface AppState {
  spinner: SpinnerState;
}

export interface AppGetters {
  currentSpin?: Spin;
  lockedWheelCount: number;
  spinnerWheelProps: SpinnerWheelProps[];
  wheelCount: number;
}
