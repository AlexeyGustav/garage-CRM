<template>
  <div class="garage-detail">

    <router-link :to="{ name: 'garages' }" class="back-btn">← Назад</router-link>

    <div v-if="garage">
      <div class="garage-detail__header">
        <h1 class="garage-detail__title">Гараж #<span class="garage-number">42</span></h1>
        <span class="garage-detail__status">Свободен</span>
      </div>

      <div v-if="garage" class="garage-detail__grid">
        <div class="garage-detail__card">
          <p class="garage-detail__label">Адрес</p>
          <p class="garage-detail__value">{{ garage.address }}</p>
        </div>
        <div class="garage-detail__card">
          <p class="garage-detail__label">Площадь</p>
          <p class="garage-detail__value garage-number">{{ garage.area_m2 }} м/кв</p>
        </div>
        <div class="garage-detail__card">
          <p class="garage-detail__label">Цена покупки</p>
          <p class="garage-detail__value payment-amount">{{ formatPrice(garage.purchase_price) }} ₽</p>
        </div>
        <div class="garage-detail__card">
          <p class="garage-detail__label">Аренда в месяц</p>
          <p class="garage-detail__value payment-amount">5 000 ₽</p>
        </div>
      </div>

      <div class="garage-detail__actions">
        <button class="btn btn--danger">Удалить</button>
        <button class="btn btn--primary">Редактировать</button>
      </div>
    </div>

    <div v-else>
  <p>Гараж не найден</p>
</div>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useGaragesStore } from '../stores/garages.js';
import { computed } from 'vue';
import { formatPrice } from '../utils/format.js'

const route = useRoute();
const store = useGaragesStore();

const garageID = computed(() => route.params.id);
const garage = computed(() => store.getById(garageID.value));
</script>

<style scoped>
.garage-detail {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.back-btn {
  align-self: flex-start;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #2d6a4f;
  padding: 0;
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
  background: #d8f3dc;
  color: #2d6a4f;
}

.garage-detail__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.garage-detail__card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.garage-detail__label {
  margin: 0;
  font-size: 12px;
  color: #888;
}

.garage-detail__value {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.garage-detail__actions {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.btn--primary {
  background: #2d6a4f;
  color: #fff;
}

.btn--danger {
  background: #fff;
  border: 1px solid #e53935;
  color: #e53935;
}
</style>