<template>
  <div class="garages">
    <div class="garages-header">
      <h1 class="garages-title">Гаражи</h1>
      <button class="btn btn--primary" @click="showForm = !showForm">+ Добавить</button>
    </div>

    <!-- Форма добавления -->
    <form v-if="showForm" class="garages-form" @submit.prevent="handleAdd">
      <input class="garages-form__input" v-model="form.address" placeholder="Адрес" required />
      <input
        class="garages-form__input"
        v-model="form.num"
        type="number"
        placeholder="Номер гаража"
        required
      />
      <input
        class="garages-form__input"
        v-model="form.area_m2"
        type="number"
        placeholder="Площадь м²"
      />
      <input
        class="garages-form__input"
        v-model="form.purchase_price"
        type="number"
        placeholder="Цена покупки ₽"
        required
      />
      <div class="garages-form__actions">
        <button class="btn btn--primary" type="submit">Сохранить</button>
        <button class="btn btn--ghost" type="button" @click="showForm = false">Отмена</button>
      </div>
    </form>

    <Loader v-if="storeGarages.isLoading" :size="200" />
    <!-- Пусто -->
    <p v-else-if="storeGarages.garages.length === 0" class="garages-empty">Гаражей пока нет</p>

    <!-- Список -->
    <div v-else class="garages-list">
      <div v-for="garage in storeGarages.garages" :key="garage.id" class="garage-card">
        <div class="garage-card__top">
          <span class="garage-number garage-card__address">{{ garage.address }}</span>
          <span
            :class="[
              'garage-card__status',
              isGarageOccupied(garage.id)
                ? 'garage-card__status--occupied'
                : 'garage-card__status--free',
            ]"
          >
            {{ isGarageOccupied(garage.id) ? 'Занят' : 'Свободен' }}
          </span>
        </div>
        <router-link class="garage-card__link" :to="{ name: 'garage', params: { id: garage.id } }">
          Открыть →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useGaragesStore } from '../stores/garages.js';
import { useTenantsStore } from '../stores/tenants.js';
import Loader from '@/components/Loader.vue';

const storeGarages = useGaragesStore();
const storeTenants = useTenantsStore();
const showForm = ref(false);

onMounted(() => {
  storeGarages.fetchGarages();
});

const form = ref({
  address: '',
  area_m2: '',
  purchase_price: '',
  num: '',
});

function handleAdd() {
  storeGarages.add({ ...form.value });
  form.value = {
    address: '',
    area_m2: '',
    purchase_price: '',
    num: '',
  };
  showForm.value = false;
}

// Статус занят или свободен
function isGarageOccupied(garageId) {
  return storeTenants.tenants.some((tenant) => tenant.garageId === garageId);
}
</script>

<style scoped>
.garages {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.garages-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.garages-title {
  margin: 0;
  font-size: 24px;
}

.garages-empty {
  color: #888;
  text-align: center;
  padding: 40px 0;
}

/* Форма */
.garages-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f9f9f7;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
}

.garages-form__input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
}

.garages-form__input:focus {
  border-color: #2d6a4f;
}

.garages-form__actions {
  display: flex;
  gap: 10px;
}

/* Список */
.garages-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Карточка */
.garage-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.garage-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.garage-card__address {
  font-size: 15px;
  font-weight: 600;
}

.garage-card__status {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.garage-card__status--free {
  background: #d8f3dc;
  color: #2d6a4f;
}

.garage-card__status--occupied {
  background: #fff3e0;
  color: #e65100;
}

.garage-card__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.garage-card__area {
  font-size: 13px;
  color: #888;
}

.garage-card__rent {
  font-size: 15px;
}

.garage-card__link {
  align-self: flex-end;
  font-size: 13px;
  color: #2d6a4f;
  font-weight: 600;
  text-decoration: none;
}

/* Кнопки */
.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.btn--primary {
  background: #2d6a4f;
  color: #fff;
}

.btn--ghost {
  background: transparent;
  border: 1px solid #ccc;
  color: #333;
}
</style>
