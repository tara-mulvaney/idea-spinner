<script lang="ts" setup>
  import { ref, watch } from "vue";

  // see: https://github.com/vuejs/core/issues/4294
  interface SpinnerWheelProps {
    description?: string;
    isLocked: boolean;
    isSpinning: boolean;
    name: string;
    value?: string;
  }

  const props = defineProps<SpinnerWheelProps>();

  const input = ref<HTMLInputElement | null>(null);

  const isAnimating = ref(false);
  const hasInnerFocus = ref(false);

  const displayEmptyValue = "--";

  watch(
    () => props.value,
    () => {
      isAnimating.value = true;
    }
  );

  const emit = defineEmits(["edit", "lock", "unlock"]);

  function toggleLock() {
    if (props.isSpinning) {
      return;
    }

    emit(props.isLocked ? "unlock" : "lock", props.name);
  }

  function updateValue({ target }: Event) {
    const { value } = target as HTMLInputElement;

    emit("edit", { value });
  }

  function _resetAnimation() {
    isAnimating.value = false;
  }

  function _delegateKeystroke(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return toggleLock();
      case "Tab":
        return;
      default:
        input.value?.focus();
    }
  }
</script>

<template>
  <li
    :class="{
      SpinnerWheel: true,
      'SpinnerWheel--stopped': isLocked || !isSpinning,
      'SpinnerWheel--tick': !isLocked && isAnimating && isSpinning,
      'SpinnerWheel--innerFocus': hasInnerFocus,
    }"
    :tabindex="value === undefined ? -1 : 1"
    @animationend="_resetAnimation()"
    @keydown="_delegateKeystroke($event)"
  >
    <header class="SpinnerWheel__header">
      <label
        class="SpinnerWheel__name"
        :for="name"
      >
        {{ name }}
      </label>
      <i
        :class="{
          SpinnerWheel__lock: true,
          'SpinnerWheel__lock--locked': isLocked,
        }"
        role="button"
        tabindex="-1"
        @click.prevent="toggleLock()"
        @keydown.enter="toggleLock()"
      >
        {{ isLocked ? "🔒" : "🔓" }}
      </i>
    </header>
    <button
      :class="{
        SpinnerWheel__value: true,
        'SpinnerWheel__value--description':
          Boolean(description) && (isLocked || !isSpinning),
      }"
      tabindex="-1"
      :title="description"
      @click.stop.prevent="input?.focus()"
      @keydown="input?.focus()"
    >
      <!--
        ISSUE #32: somehow get contenteditable to work

        For the life of me I could not get contenteditable 
        to work in Vue3 - so, my clever workaround was to bind the 
        size attribute to the current input value's length.

        Still, contenteditable would allow for text wrapping here,
        which would be nice (textarea doesn't work)
      -->
      <input
        :id="name"
        ref="input"
        class="SpinnerWheel__valueInput"
        :disabled="value === undefined || isSpinning"
        :size="value?.length ?? displayEmptyValue.length"
        tabindex="-1"
        :value="value ?? displayEmptyValue"
        @blur="hasInnerFocus = false"
        @focus="hasInnerFocus = true"
        @input="updateValue($event)"
      />
    </button>
  </li>
</template>

<style scoped>
  * {
    all: initial;
  }

  .SpinnerWheel {
    animation-duration: var(--animation-timing);
    background: var(--color-primary);
    border-radius: var(--gutter-narrow);
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
    transition: background var(--animation-timing) ease-out;
  }

  .SpinnerWheel,
  .SpinnerWheel__header,
  .SpinnerWheel__value {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .SpinnerWheel:focus,
  .SpinnerWheel--innerFocus {
    outline: 3px solid var(--color-primary-variant);
    outline-offset: 2px;
  }

  .SpinnerWheel__header {
    background: var(--color-primary-variant);
    border-bottom: var(--hairline) solid var(--color-primary);
    height: var(--gutter-wide);
    line-height: var(--gutter-wide);
    width: 100%;
  }

  .SpinnerWheel__header * {
    user-select: none;
  }

  .SpinnerWheel__name {
    color: var(--color-primary-variant-foreground);
    font-family: var(--font-primary);
    font-size: var(--gutter-standard);
    font-weight: bold;
    text-transform: uppercase;
  }

  .SpinnerWheel__lock {
    cursor: pointer;
    float: right;
    line-height: var(--gutter-wide);
    opacity: 0.5;
    position: absolute;
    right: var(--gutter-standard);
  }

  .SpinnerWheel__lock.SpinnerWheel__lock--locked {
    opacity: 1;
  }

  .SpinnerWheel__value {
    box-sizing: border-box;
    flex-grow: 1;
    padding: var(--gutter-narrow);
    width: 100%;
  }

  .SpinnerWheel__valueInput {
    color: var(--color-primary-foreground);
    font-family: var(--font-secondary);
    font-size: var(--gutter-large);
    max-width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    transition: color var(--animation-timing) ease-out;
  }

  .SpinnerWheel__value--description {
    cursor: help;
  }

  .SpinnerWheel__value--description::before {
    content: "ℹ️";
    padding: 0 var(--gutter-narrow);
  }

  .SpinnerWheel--tick {
    animation-name: tick;
  }

  @keyframes tick {
    from {
      background-color: var(--color-primary-variant);
      border-color: var(--color-primary-variant-foreground);
      color: var(--color-primary-variant-foreground);
    }

    to {
      background-color: var(--color-primary);
      border-color: var(--color-primary-foreground);
      color: var(--color-primary-foreground);
    }
  }

  .SpinnerWheel--stopped {
    background: var(--color-primary-variant);
  }

  .SpinnerWheel--stopped .SpinnerWheel__valueInput {
    color: var(--color-primary-variant-foreground);
  }

  .SpinnerWheel--stopped > .SpinnerWheel__name {
    border-color: var(--color-primary-variant-foreground);
  }
</style>
