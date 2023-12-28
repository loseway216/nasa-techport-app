<template>
  <!-- TODO:  -->
  <div class="text-white">
    <h2>Oops {{ error.statusCode }}</h2>
    <h2>{{ error.message }}</h2>
    <button @click="handleError">Clear errors</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
