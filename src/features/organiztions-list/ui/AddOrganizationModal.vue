<script setup lang="ts">
import {ref, defineEmits, computed, watchEffect} from 'vue';
import {isValidPhone} from "../../../shared/lib/validTel";
import { useOrganizations } from '../../../entities/organization/model/useOrganizations';
import Input from '../../../shared/ui/Input/Input.vue';
import Modal from '../../../shared/ui/Modal/Modal.vue';
import Button from '../../../shared/ui/Button/Button.vue';

const { addOrganization } = useOrganizations();

const form = ref({
  name: '',
  fio: '',
  tel: ''
});

const isTouched = ref(false);

const validateForm = computed(() => {
  return form.value.name && form.value.fio && form.value.tel && isValidPhone(form.value.tel) ? false : true
})

watchEffect(() => {
  if (form.value.name || form.value.fio || form.value.tel) {
    isTouched.value = true;
  }
});

const emit = defineEmits(['close']);

const handleSubmit = () => {
  addOrganization(form.value);
  emit('close');
  form.value = { name: '', fio: '', tel: '' };
};
</script>

<template>
  <Modal :is-open="isOpen" @close="$emit('close')">
    <h2>Добавить организацию</h2>
    <form @submit.prevent="handleSubmit" class="mt-2">
      <Input v-model="form.name" placeholder="Название" :type="'text'" />
      <Input v-model="form.fio" placeholder="ФИО директора" :type="'text'" />
      <Input v-model="form.tel" placeholder="Телефон" :type="'tel'" />
      <template v-if="isTouched && validateForm">
        <span>Данные не корректны</span>
      </template>
      <div class="actions d-flex justify-space-between mt-2">
        <Button type="button" @click="$emit('close')">Отмена</Button>
        <Button :disabled="!isTouched || validateForm" type="submit">Сохранить</Button>
      </div>
    </form>
  </Modal>
</template>
