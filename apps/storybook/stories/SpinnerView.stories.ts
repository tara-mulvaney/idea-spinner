import Spinner from "../../web/src/Spinner/views/Spinner.vue";
import args, { SpinnerProps } from "../../web/src/Spinner/views/props";
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
    <div style="width: 100vw; height: 100vh; max-width: 1080px; max-height: 320px;">
      <Spinner
        :wheels="wheels" 
        :is-spinning="isSpinning"
        :max-columns="maxColumns" 
        @spin='handleSpin'
      />
    </div>
  `
});
