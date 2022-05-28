import SpinnerWheel from "./SpinnerWheel.vue";
import args, { SpinnerWheelProps } from "./props";

export default {
  args,
  component: SpinnerWheel,
  title: "Spinner/Spinner Wheel"
};

export const Example = (wheel: SpinnerWheelProps) => ({
  components: { SpinnerWheel },
  setup() {
    return { wheel };
  },
  template: `<SpinnerWheel v-bind="wheel" />`
});
