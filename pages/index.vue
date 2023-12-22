<template>
  <div>List</div>
  <ul>
    <li v-for="project in data?.projects" :key="project.projectId">
      <NuxtLink :to="`/details/${project.projectId}`">{{ project.projectId }}</NuxtLink>
      {{ project.lastUpdated }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/projects", {
  params: {
    updatedSince: "2023-12-20",
  },
});
</script>
