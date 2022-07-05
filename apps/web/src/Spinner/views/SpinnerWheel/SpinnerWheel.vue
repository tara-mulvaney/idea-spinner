<script lang="ts" setup>
import { ref, watch } from "vue";

// see: https://github.com/vuejs/core/issues/4294
interface SpinnerWheelProps {
  description?: string;
  isSpinning: boolean;
  name: string;
  tickDuration: string;
  value?: string;
}

const props = defineProps<SpinnerWheelProps>();

const isAnimating = ref(false);

watch(
  () => props.value,
  () => {
    isAnimating.value = true;
  }
);

function clearChange() {
  isAnimating.value = false;
}
</script>

<template>
  <li :class="{
    'SpinnerWheel': true,
    'SpinnerWheel--stopped': !isSpinning,
    'SpinnerWheel--tick': isAnimating && isSpinning,
  }" @animationend="clearChange">
    <h2 class="SpinnerWheel__name">{{ name }}</h2>
    <div
      :class="{ 'SpinnerWheel__value': true, 'SpinnerWheel__value--description': Boolean(description) }"
      :title="description">{{ value ?? "--"
      }}</div>
  </li>
</template>

<style scoped>
* {
  all: initial;
}

.SpinnerWheel {
  animation-duration: v-bind(tickDuration);
  background: var(--color-primary);
  border-radius: var(--gutter-narrow);
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: background var(--animation-timing) ease-out;
}

.SpinnerWheel__name {
  background: var(--color-primary-variant);
  border-bottom: var(--hairline) solid var(--color-primary-variant);
  color: var(--color-primary-variant-foreground);
  font-family: var(--font-primary);
  font-size: var(--gutter-narrow);
  font-weight: bold;
  height: var(--gutter-wide);
  line-height: var(--gutter-wide);
  text-transform: uppercase;
  width: 100%;
}

.SpinnerWheel__value {
  color: var(--color-primary-foreground);
  flex-grow: 1;
  font-family: var(--font-secondary);
  text-align: center;
  font-size: var(--gutter-wide);
  transition: color var(--animation-timing) ease-out;
  padding: var(--gutter-narrow);
}

.SpinnerWheel__value--description {
  cursor: help;
}

.SpinnerWheel__value--description::before {
  content: "ℹ️";
  padding: var(--gutter-narrow);
}

.SpinnerWheel,
.SpinnerWheel__name,
.SpinnerWheel__value {
  align-items: center;
  display: flex;
  justify-content: center;
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

.SpinnerWheel--stopped>.SpinnerWheel__value {
  color: var(--color-primary-variant-foreground);
}

.SpinnerWheel--stopped>.SpinnerWheel__name {
  border-color: var(--color-primary-variant-foreground);
}
</style>
