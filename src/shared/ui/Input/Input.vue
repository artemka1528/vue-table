<script setup lang="ts">
import {defineProps, defineEmits, watch, ref} from "vue";

interface InputProps {
  placeholder?: string;
  type?: string;
  modelValue: string;
}

const props = defineProps<InputProps>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const inputValue = ref<string>(props.modelValue);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
watch(() => props.modelValue, (newValue: string) => {
  inputValue.value = newValue
});
</script>

<template>
  <div class="input-container">
    <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        class="input-field"
    >
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .input-field {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    &::placeholder {
      color: #999;
    }
  }
}
</style>
