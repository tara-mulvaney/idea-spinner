import { AppState } from "./types";
import { Spin } from "@idea-spinner/spinner";
import { SpinnerWheelProps } from "../components";
import { SpinnerState, WheelOverride } from "./spinner";

const getNoSpinWheelProps = ({
  spinner: {
    parameters: { wheels },
  },
}: SpinnerState): SpinnerWheelProps[] => {
  const result = [];

  for (const [name] of wheels.entries()) {
    result.push({
      isLocked: false,
      isSpinning: false,
      name,
    });
  }

  return result;
};

const getLiveSpinWheelProps = (
  spin: Spin,
  wheelOverrides: { [wheelName: string]: WheelOverride | undefined }
): SpinnerWheelProps[] => {
  const result = [];

  for (const [name, { value: rawValue, isSpinning }] of spin.wheels.entries()) {
    const override = wheelOverrides[name] ?? {
      isLocked: false,
      value: rawValue,
    };

    let { value } = override;

    if (typeof value === "string") {
      value = { value };
    }

    result.push({
      ...value,
      isLocked: override.isLocked,
      isSpinning,
      name,
    });
  }

  return result;
};

export default {
  currentSpin({ spinner: state }: AppState): Spin | undefined {
    if (!Boolean(state.currentSpinID)) return;

    return state.spinner.getSpin(state.currentSpinID as string);
  },
  isSpinnerFullyLocked({ spinner: state }: AppState): boolean {
    return (
      state.spinner.parameters.wheels.size ===
      Object.values(state.wheelOverrides).filter(({ isLocked }) => isLocked)
        .length
    );
  },
  spinnerWheelsProps({ spinner: state }: AppState): SpinnerWheelProps[] {
    if (state.currentSpinID === undefined) {
      return getNoSpinWheelProps(state);
    }

    const currentSpin = state.spinner.getSpin(state.currentSpinID);

    if (!currentSpin) {
      return getNoSpinWheelProps(state);
    }

    return getLiveSpinWheelProps(currentSpin, state.wheelOverrides);
  },
};
