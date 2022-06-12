export interface SpinnerWheelProps {
  isSpinning: boolean;
  name: string;
  tickDuration: string;
  value?: string;
}

export default {
  isSpinning: false,
  name: "Demo Wheel",
  tickDuration: "200ms",
  value: "Clowns"
} as SpinnerWheelProps;
