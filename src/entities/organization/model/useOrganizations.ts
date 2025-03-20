import { ref, computed } from 'vue';
import type { Organization } from './types';
import { persistData } from '../../../shared/api/localStorage';

const LOCAL_STORAGE_KEY = 'organizations';
const items = ref<Organization[]>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'));

export const useOrganizations = () => {
    const addOrganization = (org: Omit<Organization, 'id'>) => {
        const newItem: Organization = {
            ...org,
            id: items.value.length + 1
        };
        items.value.push(newItem);
        persistData(LOCAL_STORAGE_KEY, items.value);
    };

    const deleteOrganization = (id: number) => {
        items.value = items.value.filter(item => item.id !== id);
        persistData(LOCAL_STORAGE_KEY, items.value);
    };

    return {
        organizations: computed(() => items.value),
        addOrganization,
        deleteOrganization
    };
};
