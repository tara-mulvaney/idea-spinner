<script setup lang="ts">
  import { useStore } from "vuex";
  import { AppGetters, AppState } from "../store/types";
  import { computed, nextTick } from "vue";
  import { Spinner, SpinnerStoreMutations } from "../modules/Spinner";

  const MS_IN_SECOND = 1000;
  const FRAMES_PER_SECOND = 60;

  // TODO: spinner store that auto-handles mutation key nesting
  const store = useStore<AppState>();

  // ISSUE #38: don't split off getters to type it independently
  const storeGetters = store.getters as AppGetters;

  const isSpinning = computed(() => store.state.spinner.isSpinning);
  const hasSpun = computed(() => Boolean(store.state.spinner.currentSpinID));
  const wheels = computed(() => storeGetters.spinnerWheelProps);
  const isLocked = computed(
    () => storeGetters.wheelCount === storeGetters.lockedWheelCount
  );

  console.log(hasSpun);

  function spin() {
    store.commit(`spinner/${SpinnerStoreMutations.SPIN}`);

    let lastFrameTS = Date.now();

    const intervalID = setInterval(() => {
      void nextTick(() => {
        const currentFrameTS = Date.now();

        store.commit(
          `spinner/${SpinnerStoreMutations.ADVANCE}`,
          currentFrameTS - lastFrameTS
        );

        lastFrameTS = currentFrameTS;

        if (!store.state.spinner.isSpinning) {
          clearInterval(intervalID);
        }
      });
    }, MS_IN_SECOND / FRAMES_PER_SECOND);
  }

  function wheelOperation(
    operation: SpinnerStoreMutations.LOCK | SpinnerStoreMutations.UNLOCK
  ) {
    return (wheelName: string) => {
      const { currentSpin } = storeGetters;

      if (!currentSpin) {
        return;
      }

      store.commit(`spinner/${operation}`, currentSpin.wheels.get(wheelName));
    };
  }

  const lockWheel = wheelOperation(SpinnerStoreMutations.LOCK);
  const unlockWheel = wheelOperation(SpinnerStoreMutations.UNLOCK);

  function editWheel({
    value,
    wheelName,
  }: {
    value: string;
    wheelName: string;
  }) {
    storeGetters.currentSpin?.wheels
      .get(wheelName)
      ?.unsafeForceValue({ value });

    lockWheel(wheelName);
  }
</script>

<template>
  <!-- TODO: weird first load glitch -->
  <div class="SpinnerContainer">
    <Spinner
      :has-spun="hasSpun"
      :is-locked="isLocked"
      :is-spinning="isSpinning"
      :wheels="wheels"
      @edit-wheel="editWheel"
      @lock-wheel="lockWheel"
      @spin="spin"
      @unlock-wheel="unlockWheel"
    />
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
    --gutter-large: 1.5rem;
    --gutter-wide: 3rem;

    --color-primary: hsl(204, 64%, 90%);
    --color-primary-foreground: hsl(0, 0%, 0%);
    --color-primary-variant: hsl(202, 68%, 42%);
    --color-primary-variant-foreground: hsl(0, 0%, 100%);

    --font-primary: "HelveticaNeue", Helvetica, sans-serif;
    --font-secondary: "Menlo", monospace;

    --animation-timing: 240ms;
  }
</style>
