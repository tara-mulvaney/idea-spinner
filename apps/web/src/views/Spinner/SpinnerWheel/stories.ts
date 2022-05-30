import SpinnerWheel from "./SpinnerWheel.vue";
import args, { SpinnerWheelProps } from "./props";

export default {
  args,
  component: SpinnerWheel,
  title: "Views/Spinner/Spinner Wheel",
  parameters: {
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true
      }
    }
  }
};

export const Example = (wheel: SpinnerWheelProps) => ({
  components: { SpinnerWheel },
  setup() {
    return { wheel };
  },
  template: "<SpinnerWheel v-bind='wheel' />"
});
