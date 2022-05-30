<!-- <template>
  <article class="Main">
    <slot-machine ref="slotMachine" :slots="slots" @done="stopSpinning">
    </slot-machine>
    <slot-lever @pull="startSpinning" :is-spinning="isSpinning"></slot-lever>
  </article>
</template>

<script lang="ts">
import Component from "vue-class-component";

import { SpinnerView } from "./views";

import Vue from "vue";

@Component({
  components: {
    SlotLever,
    SlotMachine,
  },
})
/**
 * Main, default page. contains the app.
 */
export default class Main extends Vue {
  isSpinning = false;
  slots = config.slots;

  /**
   * spins the slot machine
   *
   * @returns {void}
   */
  startSpinning() {
    this.isSpinning = true;

    (this.$refs.slotMachine as SlotMachine).spin();
  }

  /**
   * stops the slot machine
   *
   * @returns {void}
   */
  stopSpinning() {
    this.isSpinning = false;
  }
}
</script>

<style scoped>
.Main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;

  width: 100vw;
}
</style> -->
