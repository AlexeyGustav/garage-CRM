<template>
  <div class="tenants">
    <div class="tenants-header">
      <h1 class="tenants-title">Арендаторы</h1>
      <a href="../assets/docs/куплю гараж.docx" download>Скачать договор</a>
      <button @click="openTenantsForm = true" class="btn btn--primary" type="button">
        + Добавить
      </button>
    </div>

    <!-- Форма добавления (пока статичная заглушка) -->
    <form v-if="openTenantsForm" class="tenants-form">
      <input
        class="tenants-form__input"
        v-model="tenantsForm.name"
        type="text"
        placeholder="ФИО арендатора"
      />
      <!-- Основной номер -->
      <input
        class="tenants-form__input tenant-phone"
        :value="tenantsForm.telephone"
        @input="onPhoneInput"
        @focus="onPhoneFocus('telephone')"
        @keydown="onPhoneKeyDown"
        type="tel"
        placeholder="Основной номер телефона"
        maxlength="18"
      />
      <!-- Дополнительный номер (необязательный) -->
      <input
        class="tenants-form__input tenant-phone"
        :value="tenantsForm.extraPhone"
        @input="onExtraPhoneInput"
        @focus="onPhoneFocus('extraPhone')"
        @keydown="onPhoneKeyDown"
        type="tel"
        placeholder="Доп. номер телефона (необязательно)"
        maxlength="18"
      />
      <select v-model="tenantsForm.garageId" class="tenants-form__input tenants-form__select">
        <option value="" disabled selected>Выберите гараж</option>
        <option v-for="garage in storeGarages.garages" :key="garage.id" :value="garage.id">
          Гараж № {{ garage.num }} — {{ garage.address }}
        </option>
      </select>
      <input
        class="tenants-form__input rent-date"
        v-model="tenantsForm.data"
        type="date"
        placeholder="Дата начала аренды"
      />
      <!-- Сумма аренды в месяц -->
      <input
        class="tenants-form__input payment-amount"
        v-model.number="tenantsForm.rentAmount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Сумма аренды в месяц ₽"
      />
      <!-- Залог -->
      <input
        class="tenants-form__input payment-amount"
        v-model.number="tenantsForm.deposit"
        type="number"
        min="0"
        step="0.01"
        placeholder="Залог ₽"
      />
      <div class="tenants-form__actions">
        <button @click="add" class="btn btn--primary" type="button">Сохранить</button>
        <button @click="cancelTenants" class="btn btn--ghost" type="button">Отмена</button>
      </div>
    </form>

    <Loader v-if="storeTenants.isLoading" :size="200" />
    <template v-else>
      <!-- Состояние: когда список пуст  -->
      <p v-if="!storeTenants.tenants.length" class="tenants-empty">Арендаторов пока нет</p>
      <!-- Список карточек арендаторов -->
      <div class="tenants-list">
        <div
          v-for="human in storeTenants.tenants"
          :key="human.id"
          class="tenant-card"
          :class="human.archived ? 'tenant-card--archived' : ''"
        >
          <div class="tenant-card__top">
            <span class="tenant-card__name">{{ human.name }}</span>
            <span class="garage-number tenant-card__garage"
              >Гараж № {{ searchGarage(human.garageId) }}</span
            >
          </div>

          <div class="tenant-card__details">
            <div class="tenant-card__phones">
              <span class="tenant-phone tenant-card__phone">
                {{
                  human.telephone && human.telephone.length > 10
                    ? human.telephone
                    : 'Телефон не указан'
                }}
              </span>
              <span
                v-if="human.extraPhone && human.extraPhone.length > 10"
                class="tenant-phone tenant-card__phone--extra"
              >
                {{ human.extraPhone }}
              </span>
            </div>

            <!-- Финансы: аренда и залог -->
            <div class="tenant-card__money">
              <span v-if="human.rentAmount" class="payment-amount tenant-card__rent">
                {{ formatPrice(human.rentAmount) }} ₽/мес
              </span>
              <span v-if="human.deposit" class="payment-amount tenant-card__deposit">
                Залог: {{ formatPrice(human.deposit) }} ₽
              </span>
            </div>
          </div>

          <div class="tenant-card__bottom">
            <span v-if="human.data" class="rent-date tenant-card__date">с {{ human.data }}</span>
            <div class="tenant-card__actions">
              <span v-if="human.archived" class="tenant-card__archived-badge">В архиве</span>
              <button
                v-else
                @click="archiveTenant(human.id, human.archived)"
                type="button"
                class="tenant-card__archive"
                title="Прекратить начисления платежей"
              >
                В архив
              </button>
              <button
                @click="deleteTenants(human.id)"
                class="tenant-card__delete"
                type="button"
                title="Удалить арендатора"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTenantsStore } from '@/stores/tenants.js';
import { useGaragesStore } from '@/stores/garages.js';
import { formatPrice, formatPhone } from '@/utils/format.js';
import Loader from '@/components/Loader.vue';
import { onMounted } from 'vue';

const storeTenants = useTenantsStore();
const storeGarages = useGaragesStore();

onMounted(() => {
  storeTenants.fetchTenants();
});

const openTenantsForm = ref(false);
const tenantsForm = ref({
  name: '',
  telephone: '',
  data: '',
  garageId: '',
  extraPhone: '',
  rentAmount: '',
  deposit: '',
  archived: false,
});

// Добавить арендатора
function add() {
  storeTenants.add({ ...tenantsForm.value });

  tenantsForm.value = {
    name: '',
    telephone: '',
    data: '',
    garageId: '',
    extraPhone: '',
    rentAmount: '',
    deposit: '',
    archived: false,
  };

  openTenantsForm.value = false;
}

// Закрыть форму
function cancelTenants() {
  tenantsForm.value = {
    name: '',
    telephone: '',
    data: '',
    garageId: '',
    extraPhone: '',
    rentAmount: '',
    deposit: '',
    archived: false,
  };
  openTenantsForm.value = false;
}

// Найти гараж
function searchGarage(garageId) {
  const garage = storeGarages.getById(garageId);
  return garage ? garage.num : '';
}

// Удалить арендатора
function deleteTenants(tenantsId) {
  storeTenants.remove(tenantsId);
}

// Маска для телефона
function onPhoneInput(event) {
  tenantsForm.value.telephone = formatPhone(event.target.value);
}
// Дополнительный ТЕЛЕФОН
function onExtraPhoneInput(event) {
  tenantsForm.value.extraPhone = formatPhone(event.target.value);
}
function onPhoneFocus(field) {
  if (tenantsForm.value[field] === '') {
    tenantsForm.value[field] = '+7 (';
  }
}
// Кроме цифр ничего нельзя вводить
function onPhoneKeyDown(event) {
  const isDigit = event.key >= '0' && event.key <= '9';
  const isServiceKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
    event.key,
  );
  const isShortcut = event.ctrlKey || event.metaKey;

  // Если нажато что-то другое (например буква или спецсимвол)
  if (!isDigit && !isServiceKey && !isShortcut) {
    event.preventDefault(); // блокируем ввод буквы
  }
}
// Кнопка "В архив"
function archiveTenant(id, isArchived) {
  storeTenants.update(id, { archived: !isArchived });
}
</script>

<style scoped>
.tenants {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tenants-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 440px) {
  .tenants-header {
    flex-wrap: wrap;
    gap: 20px;
  }
  .tenants-title {
    order: 1;
  }
  .tenants-header a {
    order: 3;
  }
  .tenants-header .btn {
    order: 2;
  }
}

.tenants-title {
  margin: 0;
  font-size: 24px;
  cursor: default;
}

.tenants-empty {
  color: #888;
  text-align: center;
  padding: 40px 0;
  cursor: default;
}

/* Форма добавления */
.tenants-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f9f9f7;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
}

.tenants-form__input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  background: #fff;
  transition: border-color 0.15s;
}

.tenants-form__input:focus {
  border-color: #2d6a4f;
}

.tenants-form__select {
  cursor: pointer;
  background-color: #fff;
  color: #222;
}

.tenants-form__select:invalid,
.tenants-form__select option[value=''] {
  color: #888;
}

.tenants-form__actions {
  display: flex;
  gap: 10px;
}

/* Список */
.tenants-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Карточка арендатора */
.tenant-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff;
  transition:
    box-shadow 0.15s,
    border-color 0.15s;
}

.tenant-card:hover {
  border-color: #cfcfcf;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tenant-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.tenant-card__name {
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.tenant-card__garage {
  font-size: 13px;
  background: #f0f4f1;
  color: #2d6a4f;
  padding: 3px 8px;
  border-radius: 6px;
}

.tenant-card__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #555;
}

.tenant-card__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;
  border-top: 1px dashed #eee;
}

.tenant-card__date {
  font-size: 12px;
  color: #888;
}

/* Действия в карточке (архив + удаление) */
.tenant-card__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.tenant-card__archive {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #888;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: color 0.15s;
}

.tenant-card__archive:hover {
  color: #2d6a4f;
  text-decoration: underline;
}

.tenant-card__archived-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: #eee;
  color: #888;
  cursor: default;
}

.tenant-card__delete {
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: #e53935;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: opacity 0.15s;
}

.tenant-card__delete:hover {
  opacity: 0.75;
  text-decoration: underline;
}

.tenant-card--archived {
  opacity: 0.55;
  background: #f5f5f3;
}

.tenant-card--archived:hover {
  box-shadow: none;
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
  transition: opacity 0.15s;
}

.btn:hover {
  opacity: 0.9;
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

.tenant-card__phones {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tenant-card__phone--extra {
  color: #777;
}

/* Финансы в карточке */
.tenant-card__money {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.tenant-card__rent {
  font-size: 14px;
  font-weight: 500;
  color: #222;
}

.tenant-card__deposit {
  font-size: 12px;
  color: #e65100;
}
</style>
