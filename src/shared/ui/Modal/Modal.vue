<script setup lang="ts">
import {defineProps, defineEmits, ref, watch} from "vue";
interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const closeModal = () => {
  emit('closeModal')
}

const emit = defineEmits(['closeModal'])
</script>

<template>
  <div
      class="modal"
      :class="{'opened': isOpen}"
      @click="closeModal">
    <div class="overlay">
      <div class="content" @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
  color: #000;
}


.overlay {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  transition: 0.3s transform;
  transform: scale(0.5);
  max-width: 60%;
}
.opened {
  pointer-events: auto;
  opacity: 1;
  z-index: var(--modal-z-index);

  .content {
    transform: scale(1);
  }
}

.isClosing {
  .content {
    transform: scale(0.2);
  }
}
</style>
