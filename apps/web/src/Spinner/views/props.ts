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
    tickDuration: "200ms",
    value: "red",
  }, {
    isSpinning: true,
    name: "shape",
    tickDuration: "200ms",
    value: "round",
  }, {
    isSpinning: false,
    name: "feeling",
    tickDuration: "200ms",
    value: "sad",
  }]
} as SpinnerProps;
