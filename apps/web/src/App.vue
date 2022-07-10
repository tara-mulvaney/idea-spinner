<script setup lang="ts">
import { useStore } from "vuex";
import { computed, nextTick } from "vue";
import {
  Spinner,
  SpinnerStoreGetters,
  SpinnerStoreMutations,
  SpinnerStoreState,
} from "./Spinner";

const MS_IN_SECOND = 1000;
const FRAMES_PER_SECOND = 60;

const store = useStore<SpinnerStoreState>();

const isSpinning = computed(() => store.state.isSpinning);
const hasSpun = computed(() => Boolean(store.state.currentSpinID));
const wheels = computed(
  () => (store.getters as SpinnerStoreGetters).spinnerDisplay
);

function spin() {
  store.commit(SpinnerStoreMutations.SPIN);

  let lastFrameTS = Date.now();

  const intervalID = setInterval(() => {
    void nextTick(() => {
      const currentFrameTS = Date.now();

      store.commit(SpinnerStoreMutations.ADVANCE, currentFrameTS - lastFrameTS);

      lastFrameTS = currentFrameTS;

      if (!store.state.isSpinning) {
        clearInterval(intervalID);
      }
    });
  }, MS_IN_SECOND / FRAMES_PER_SECOND);
}
</script>

<template>
  <div class="SpinnerContainer">
    <Spinner :is-spinning="isSpinning" :has-spun="hasSpun" :wheels="wheels"
      @spin="spin" />
  </div>
</template>

<style>
main,
.SpinnerContainer {
  height: 100vh;
  width: 100%;
}

main {
  align-items: center;
  display: flex;
  justify-content: center;
}

.SpinnerContainer {
  display: block;
  max-height: var(--min-supported-width);
  max-width: var(--max-supported-width);
}

:root {
  /* stylelint-disable scale-unlimited/declaration-strict-value */
  font-size: 16px;

  --max-supported-width: 1080px;
  --min-supported-width: 320px;

  --hairline: 1px;
  --gutter-narrow: 0.75rem;
  --gutter-standard: 1rem;
  --gutter-wide: 1.5rem;

  --color-primary: hsl(204, 64%, 90%);
  --color-primary-foreground: hsl(0, 0%, 0%);
  --color-primary-variant: hsl(202, 68%, 42%);
  --color-primary-variant-foreground: hsl(0, 0%, 100%);

  --font-primary: "HelveticaNeue", Helvetica, sans-serif;
  --font-secondary: "Menlo", monospace;

  --animation-timing: 240ms;
}
</style>
