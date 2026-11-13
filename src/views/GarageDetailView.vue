<template>
  <div class="garage-detail">
    <router-link :to="{ name: 'garages' }" class="back-btn">← Назад</router-link>

    <div v-if="garage">
      <div class="garage-detail__header">
        <h1 class="garage-detail__title">
          Гараж № <span class="garage-number">{{ garage.num }}</span>
        </h1>
        <span class="garage-detail__status" :class="garage.status === 'occupied' ? 'busy' : 'free'">{{ garage.status === 'occupied' ? 'Занят' : 'Свободен' }}</span>
      </div>

      <div class="garage-detail__grid">
        <div class="garage-detail__card">
          <label class="garage-detail__label" for="num">Номер</label>
          <input
            v-model="form.num"
            id="num"
            type="number"
            class="garage-detail__input"
            :disabled="!isEditing"
          />
        </div>
        <div class="garage-detail__card">
          <label class="garage-detail__label" for="address">Адрес</label>
          <input
            v-model="form.address"
            id="address"
            type="text"
            class="garage-detail__input"
            :disabled="!isEditing"
          />
        </div>
        <div class="garage-detail__card">
          <label class="garage-detail__label" for="area">Площадь</label>
          <input
            v-model="form.area_m2"
            id="area"
            type="number"
            step="0.01"
            class="garage-detail__input"
            :disabled="!isEditing"
          />
        </div>
        <div class="garage-detail__card">
          <label class="garage-detail__label" for="purchase">Цена покупки</label>
          <input
            v-model="form.purchase_price"
            id="purchase"
            type="number"
            step="0.01"
            class="garage-detail__input"
            :disabled="!isEditing"
          />
        </div>
        <div class="garage-detail__card">
          <label class="garage-detail__label" for="rent">Аренда в месяц</label>
          <input
            v-model="form.rent_amount"
            id="rent"
            type="number"
            step="0.01"
            class="garage-detail__input"
            :disabled="!isEditing"
          />
        </div>
      </div>

      <div class="garage-detail__actions">
        <template v-if="!isEditing">
          <button @click="handleDelete" class="btn btn--danger">Удалить</button>
          <button @click="startEdit" class="btn btn--primary">Редактировать</button>
        </template>
        <template v-else>
          <Transition name="expand">
            <button v-if="isEditing" @click="saveEdit" class="btn btn--primary">Сохранить</button>
          </Transition>
        </template>
      </div>
    </div>

    <div v-else>
      <p>Гараж не найден</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useGaragesStore } from '../stores/garages.js';
import { ref, computed, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useGaragesStore();

// Редактировать
const isEditing = ref(false);
const form = ref({});

const garageID = computed(() => route.params.id);
const garage = computed(() => store.getById(garageID.value));

watch(
  garage,
  (value) => {
    if (value) form.value = { ...value };
  },
  { immediate: true },
);

function startEdit() {
  form.value = { ...garage.value };
  isEditing.value = true;
}

// Сохранить изменения
function saveEdit() {
  store.update(garageID.value, { ...form.value });
  isEditing.value = false;
}

// Удалить
function handleDelete() {
  store.remove(garageID.value);
  router.push({ name: 'garages' });
}
</script>

<style scoped>
/* Этот стиль не выносить в глобальные стили */
.btn {
  flex: 1;
}

.garage-detail {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.garage-detail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.garage-detail__title {
  margin: 0;
  font-size: 24px;
}

.garage-detail__status {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.free {
  background: #d8f3dc;
  color: #2d6a4f;
}

.busy {
  background: #fff3e0;
  color: #e65100;
}

.garage-detail__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.garage-detail__value {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.garage-detail__input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  color: #222;
  background: #fff;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.garage-detail__input:focus {
  border-color: #2d6a4f;
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
}

.garage-detail__actions {
  position: relative;
  display: flex;
  gap: 12px;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    flex-grow 0.3s ease;
  transform-origin: left center;
}

.expand-enter-from {
  transform: scaleX(0);
  opacity: 0;
}

.expand-leave-to {
  transform: scaleX(0);
  opacity: 0;
}

.expand-leave-active {
  position: absolute;
  width: 48%;
}
</style>
