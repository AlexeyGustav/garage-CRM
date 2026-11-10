import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGaragesStore = defineStore('garages', () => {
  const garages = ref([]);

  // Всего горажей
  const total = computed(() => garages.value.lenght);
  // Занятых
  const occupied = computed(() => garages.value.filter((g) => g.status === 'occupied').length);
  // Свободных
  const free = computed(() => garages.value.filter((g) => g.status === 'free'));

  // Добавление гаража
  function add(garage) {
    garages.value.push({
      id: Date.now().toString(),
      status: 'free',
      ...garage
    })
  }

  // Обновление
  function update(id, data) {
    const index = garages.value.findIndex(g => g.id === id)
    if(index !== -1) {
      garages.value[index] = { ...garages.value[index], ...data }
    }
  }

  // Удаление
  function remove(id) {
    garages.value = garages.filter((item) => item.id !== id)
  }

  // Поиск
  function getById(id) {
    return garages.value.find(item => item.id === id)
  }

  return {
    garages,
    total,
    occupied,
    free,
    add,
    update,
    remove,
    getById
  }
});
