import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useTenantsStore } from './tenants';

export const useGaragesStore = defineStore('garages', () => {
  const tenantsStore = useTenantsStore();
  const garages = ref([]);

  // Всего гаражей
  const total = computed(() => garages.value.length);
  // Занятых
  const occupied = computed(() => garages.value.filter((g) => g.status === 'occupied').length);
  // Свободных
  const free = computed(() => garages.value.filter((g) => g.status === 'free'));
  // Проверка свободен ли гараж
  function isGarageOccupied(garageId) {
    return tenantsStore.tenants.some((t) => t.garageId === garageId);
  }

  // Добавление гаража
  function add(garage) {
    garages.value.push({
      id: Date.now().toString(),
      status: 'free',
      ...garage,
    });
  }

  // Обновление
  function update(id, data) {
    const index = garages.value.findIndex((g) => g.id === id);
    if (index !== -1) {
      garages.value[index] = { ...garages.value[index], ...data };
    }
  }

  // Удаление
  function remove(id) {
    garages.value = garages.value.filter((item) => item.id !== id);
  }

  // Поиск
  function getById(id) {
    return garages.value.find((item) => item.id === id);
  }

  return {
    garages,
    total,
    occupied,
    free,
    add,
    update,
    remove,
    getById,
    isGarageOccupied,
  };
});
