<template>
  <div>detail</div>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route.params.id);

const { data, pending } = await useFetch(`/api/projects/${route.params.id}`);
</script>
