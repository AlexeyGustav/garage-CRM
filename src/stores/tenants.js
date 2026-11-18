import dataTenants from '@/mockData/tenants';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTenantsStore = defineStore('tenants', () => {
  const tenants = ref([]);

  const isLoading = ref(false);

    // мок Данные
    function fetchTenants() {
      isLoading.value = true;
      setTimeout(() => {
        try {
          tenants.value = dataTenants;
        } finally {
          isLoading.value = false;
        }
      }, 500);
    }

  // Архивные арендаторы
  const activeTenants = computed(() => tenants.value.filter((t) => !t.archived));

  function getByGarageId(garageId) {
    return tenants.value.filter((item) => item.garageId === garageId);
  }

  // Добавление арендатора
  function add(tenant) {
    tenants.value.push({
      id: Date.now().toString(),
      ...tenant,
    });
  }

  // Обновление арендатора
  function update(id, data) {
    const index = tenants.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tenants.value[index] = { ...tenants.value[index], ...data };
    }
  }

  // Удаление
  function remove(id) {
    tenants.value = tenants.value.filter((item) => item.id !== id);
  }

  // Поиск
  function getById(id) {
    return tenants.value.find((item) => item.id === id);
  }

  return {
    tenants,
    getByGarageId,
    add,
    update,
    remove,
    getById,
    activeTenants,
    isLoading,
    fetchTenants
  };
});
