<script setup lang="ts">
import { useOrganizations } from '../../../entities/organization/model/useOrganizations';
import DataTable from '../../../shared/ui/DataTable/DataTable.vue';
import AddOrganizationModal from './AddOrganizationModal.vue';
import Input from '../../../shared/ui/Input/Input.vue'
import Button from '../../../shared/ui/Button/Button.vue'
import { ref, computed } from 'vue';

const { organizations, deleteOrganization } = useOrganizations();
const isModalOpen = ref(false);

// Поисковый запрос
const searchQuery = ref('');

// Фильтрация организаций
const filteredOrganizations = computed(() => {
  if (!searchQuery.value) return organizations.value;

  const query = searchQuery.value.toLowerCase();
  return organizations.value.filter((org) => {
    return (
        org.fio.toLowerCase().includes(query)
    );
  });
});
</script>

<template>
  <div class="container">
    <div class="header d-flex align-center justify-space-between mt-5">
      <div class="search-container">
        <Input v-model="searchQuery" placeholder="Найти по ФИО" />
      </div>
      <Button @click="isModalOpen = true">Добавить</Button>

    </div>
    <DataTable
        :items="filteredOrganizations"
        @delete="deleteOrganization"
    />

    <AddOrganizationModal
        :is-open="isModalOpen"
        @close="isModalOpen = false"
    />
  </div>
</template>
