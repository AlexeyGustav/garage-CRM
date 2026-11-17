<template>
  <img
    class="loader"
    src="@/assets/loaders/loader.svg"
    :style="{ width: size + 'px', height: size + 'px' }"
    alt="Загрузка..."
  />
</template>

<script setup>
// Props с дефолтом
const props = defineProps({
  size: { type: Number, default: 48 },
});
</script>

<style scoped>
.loader {
  display: block;
  margin: 0 auto;
}
</style>
