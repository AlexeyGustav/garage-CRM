<template>
  <div class="payments">

    <div class="payments-header">
      <h1 class="payments-title">Платежи</h1>
      <button class="btn btn--primary" type="button">+ Добавить</button>
    </div>

    <!-- Фильтр по месяцу -->
    <div class="payments-filter">
      <button class="payments-filter__btn payments-filter__btn--active" type="button">← </button>
      <span class="payments-filter__month">Ноябрь 2026</span>
      <button class="payments-filter__btn" type="button"> →</button>
    </div>

    <!-- Сводка месяца -->
    <div class="payments-summary">
      <div class="payments-summary__card">
        <p class="payments-summary__label">Получено</p>
        <p class="payments-summary__value payment-amount">45 000 ₽</p>
      </div>
      <div class="payments-summary__card">
        <p class="payments-summary__label">Ожидается</p>
        <p class="payments-summary__value payment-amount">15 000 ₽</p>
      </div>
      <div class="payments-summary__card">
        <p class="payments-summary__label">Всего гаражей</p>
        <p class="payments-summary__value garage-number">4</p>
      </div>
    </div>

    <!-- Список платежей -->
    <div class="payments-list">

      <!-- Карточка платежа — оплачен -->
      <div class="payment-card payment-card--paid">
        <div class="payment-card__left">
          <span class="payment-card__garage garage-number">Гараж № 3</span>
          <span class="payment-card__tenant">Иванов Иван</span>
        </div>
        <div class="payment-card__right">
          <span class="payment-card__amount payment-amount">5 000 ₽</span>
          <span class="payment-card__status payment-card__status--paid">Оплачено</span>
        </div>
      </div>

      <!-- Карточка платежа — ожидает -->
      <div class="payment-card payment-card--pending">
        <div class="payment-card__left">
          <span class="payment-card__garage garage-number">Гараж № 7</span>
          <span class="payment-card__tenant">Петров Сергей</span>
        </div>
        <div class="payment-card__right">
          <span class="payment-card__amount payment-amount">8 000 ₽</span>
          <span class="payment-card__status payment-card__status--pending">Ожидает</span>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.payments {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.payments-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.payments-title {
  margin: 0;
  font-size: 24px;
}

/* Фильтр */
.payments-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f7;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px 16px;
}

.payments-filter__month {
  font-size: 15px;
  font-weight: 600;
}

.payments-filter__btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #2d6a4f;
  padding: 4px 8px;
  border-radius: 6px;
}

.payments-filter__btn:hover {
  background: #e8f5e9;
}

/* Сводка */
.payments-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.payments-summary__card {
  background: #f9f9f7;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.payments-summary__label {
  margin: 0;
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.payments-summary__value {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

/* Список */
.payments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Карточка */
.payment-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background: #fff;
  gap: 12px;
}

.payment-card--paid {
  border-left: 4px solid #2d6a4f;
}

.payment-card--pending {
  border-left: 4px solid #e65100;
}

.payment-card__left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.payment-card__garage {
  font-size: 14px;
  font-weight: 600;
}

.payment-card__tenant {
  font-size: 12px;
  color: #888;
}

.payment-card__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.payment-card__amount {
  font-size: 15px;
  font-weight: 700;
}

.payment-card__status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}

.payment-card__status--paid {
  background: #d8f3dc;
  color: #2d6a4f;
}

.payment-card__status--pending {
  background: #fff3e0;
  color: #e65100;
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
</style>