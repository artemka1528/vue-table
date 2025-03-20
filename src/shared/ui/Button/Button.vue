<script lang="ts" setup>
import {defineProps} from 'vue'
interface ButtonProps {
  type: string
}

defineProps<ButtonProps>()
</script>

<template>
  <button
      :type="type">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #4dabf7;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: #339af0;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: default;
    opacity: 0.7;
  }
}

td button {
  background: #ff6b6b;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

td button:hover {
  background: #ff5252;
}
</style>
