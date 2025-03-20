<script setup lang="ts">
import { ref, computed,defineEmits, watch, defineProps } from 'vue';
import type { Organization } from '@/entities/organization/model/types';
import Button from '../Button/Button.vue'
const props = defineProps<{
  items: Organization[];
}>();

const emit = defineEmits(['delete']);

const sortBy = ref<keyof Organization | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

const sortedItems = computed(() => {
  if (!sortBy.value) return props.items;

  return [...props.items].sort((a, b) => {
    const aValue = a[sortBy.value!];
    const bValue = b[sortBy.value!];

    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
});

const currentPage = ref(1);
const itemsPerPage = ref(5);

const paginatedItems = computed(() => {
  if (currentPage.value > totalPages.value || currentPage.value === 0 ) currentPage.value = totalPages.value
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedItems.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedItems.value.length / itemsPerPage.value));

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleSort = (column: keyof Organization) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortDirection.value = 'asc';
  }
  currentPage.value = 1;
};

const deleteItem = (id: number) => {
  emit('delete', id)

}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th @click="handleSort('name')">
          Название
          <span v-if="sortBy === 'name'">
              {{ sortDirection === 'asc' ? '▲' : '▼' }}
            </span>
        </th>
        <th @click="handleSort('fio')">
          ФИО директора
          <span v-if="sortBy === 'fio'">
              {{ sortDirection === 'asc' ? '▲' : '▼' }}
            </span>
        </th>
        <th>
          Телефон
        </th>
        <th />
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in paginatedItems" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.fio }}</td>
        <td>{{ item.tel }}</td>
        <td>
          <Button @click="deleteItem(item.id)">Удалить</Button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="d-flex justify-end align-center gap-2">
      <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
      >
        ◀
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
      >
        ▶
      </button>
    </div>
  </div>
</template>
