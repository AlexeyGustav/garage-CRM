import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTenantsStore = defineStore('tenants', () => {
  const tenants = ref([]);

  const isLoading = ref(false);

  function fetchTenants() {
    isLoading.value = true;
    setTimeout(() => {
      try {
        tenants.value = [
          {
            id: '1',
            name: 'Иванов Иван Иванович',
            telephone: '+7 (999) 123-45-67',
            garageId: '1',
            data: '2026-10-01',
            rentAmount: 15000,
            deposit: 15000,
            archived: false,
          },
          {
            id: '2',
            name: 'Петров Сергей Алексеевич',
            telephone: '+7 (916) 555-88-22',
            garageId: '2',
            data: '2026-08-15',
            rentAmount: 12000,
            deposit: 24000,
            archived: false,
          },
        ];
      } finally {
        isLoading.value = false;
      }
    }, 2500);
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
    fetchTenants,
  };
});
