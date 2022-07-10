import { SpinnerWheelProps } from "./SpinnerWheel";

export interface SpinnerProps {
  hasSpun: boolean;
  isSpinning: boolean;
  maxColumns?: number;
  wheels: SpinnerWheelProps[];
}

export default {
  hasSpun: false,
  isSpinning: false,
  maxColumns: 4,
  wheels: [{
    isSpinning: true,
    name: "color",
    value: "red",
  }, {
    isSpinning: true,
    name: "shape",
    value: "round",
  }, {
    isSpinning: false,
    name: "feeling",
    value: "sad",
  }]
} as SpinnerProps;
