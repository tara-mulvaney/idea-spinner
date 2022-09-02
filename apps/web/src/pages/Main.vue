<script setup lang="ts">
  import { Spinner } from "../components";
  import { AppGetters, AppState } from "../store/types";
  import { CommitOptions, useStore } from "vuex";
  import { computed, nextTick } from "vue";
  import { SpinnerMutations, WheelOverride } from "../store/spinner";

  const MS_IN_SECOND = 1000;
  const FRAMES_PER_SECOND = 60;

  const store = useStore<AppState>();
  const appGetters = store.getters as AppGetters;

  const spinnerWheelsProps = computed(() => appGetters.spinnerWheelsProps);
  const isSpinnerFullyLocked = computed(() => appGetters.isSpinnerFullyLocked);

  // spinner state helpers
  const spinnerState = store.state.spinner;
  const spinnerCommit = (
    mutation: SpinnerMutations,
    payload?: any,
    options?: CommitOptions
  ) => store.commit(`spinner/${mutation}`, payload, options);

  const hasSpun = computed(() => Boolean(spinnerState.currentSpinID));
  const isSpinning = computed(() => spinnerState.isSpinning);

  function startSpin() {
    spinnerCommit(SpinnerMutations.SPIN);

    let lastFrameTS = Date.now();

    const intervalID = setInterval(() => {
      void nextTick(() => {
        const currentFrameTS = Date.now();

        spinnerCommit(SpinnerMutations.ADVANCE, currentFrameTS - lastFrameTS);

        lastFrameTS = currentFrameTS;

        if (!spinnerState.isSpinning) {
          clearInterval(intervalID);
        }
      });
    }, MS_IN_SECOND / FRAMES_PER_SECOND);
  }

  function lockWheel(wheelName: string) {
    _overrideWheel(wheelName, { isLocked: true });
  }

  function unlockWheel(wheelName: string) {
    _overrideWheel(wheelName, { isLocked: false });
  }

  function editWheel({
    value,
    wheelName,
  }: {
    value: string;
    wheelName: string;
  }) {
    _overrideWheel(wheelName, { isLocked: true, value });
  }

  function _overrideWheel(wheelName: string, override: Partial<WheelOverride>) {
    const { currentSpin } = appGetters;

    if (!currentSpin) {
      return;
    }

    const wheel = currentSpin.wheels.get(wheelName);
    const previousOverride = spinnerState.wheelOverrides[wheelName] as
      | WheelOverride
      | undefined;

    spinnerCommit(SpinnerMutations.OVERRIDE, {
      override: {
        value: wheel?.value,
        ...(previousOverride ?? {}),
        ...override,
      },
      wheel,
    });
  }
</script>

<template>
  <div class="SpinnerContainer">
    <Spinner
      :has-spun="hasSpun"
      :is-locked="isSpinnerFullyLocked"
      :is-spinning="isSpinning"
      :wheels="spinnerWheelsProps"
      @edit-wheel="editWheel"
      @lock-wheel="lockWheel"
      @start-spin="startSpin"
      @unlock-wheel="unlockWheel"
    />
  </div>
</template>

<style>
  body,
  main,
  .SpinnerContainer {
    all: initial;
  }

  main,
  .SpinnerContainer {
    height: 100vh;
    width: 100%;
  }

  main {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: var(--gutter-narrow);
  }

  .SpinnerContainer {
    display: block;
    max-height: var(--min-supported-width);
    max-width: var(--max-supported-width);
  }

  @media screen and (max-width: 760px) {
    .SpinnerContainer {
      align-self: flex-start;
    }
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
