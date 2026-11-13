import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTenantsStore = defineStore('tenants', () => {
  const tenants = ref([]);

  function getByGarageId(garageId) {
    return tenants.value.find((item) => item.garageId === garageId);
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
  };
});
