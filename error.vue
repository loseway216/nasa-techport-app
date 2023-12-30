<template>
  <!-- TODO:  -->
  <div
    class="text-lg p-5 font-sans bg-stone-200 border-none sm:border border-slate-500 rounded-none sm:rounded-lg shadow relative flex flex-1 flex-col my-8 items-center">
    <h2>Oops! {{ error.statusCode }}, {{ error.message }}</h2>
    <button class=" bg-slate-500 w-fit rounded-lg p-1" @click="handleError">Back to home</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const handleError = () => clearError({ redirect: "/" });
</script>
