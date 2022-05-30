import Spinner from "../../web/src/views/Spinner/Spinner.vue";
import args, { SpinnerProps } from "../../web/src/views/Spinner/props";
import parameters from "../hideDocsTab";

export default {
  args,
  argTypes: {
    handleSpin: {
      action: "spin"
    }
  },
  component: Spinner,
  title: "Views/Spinner",
  parameters
};

export const Example = ({
  isSpinning,
  maxColumns,
  wheels,
  handleSpin
}: SpinnerProps & { handleSpin: () => void; }) => ({
  components: { Spinner },
  setup() {
    return { handleSpin, isSpinning, maxColumns, wheels };
  },
  template: `
    <Spinner 
      :wheels="wheels" 
      :is-spinning="isSpinning"
      :max-columns="maxColumns" 
      @spin='handleSpin'
    />
  `
});
