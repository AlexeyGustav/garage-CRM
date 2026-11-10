<template>
  <nav>
    <router-link :to="{ name: 'homePage' }">Дашборд</router-link>
    <router-link :to="{ name: 'garages' }">Гаражи</router-link>
    <router-link :to="{ name: 'tenants' }">Арендаторы</router-link>
    <router-link :to="{ name: 'payments' }">Платежи</router-link>
    <router-link :to="{ name: 'calc' }">Калькулятор</router-link>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped></style>
