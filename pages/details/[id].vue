<template>
  <div v-if="pending">loading</div>
  {{ data?.acronym }}
</template>

<script setup lang="ts">
import type { Project } from "~/types";

const route = useRoute();
// prevent user input an invalid projectId manually
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
});

// init project detail
const project = ref<Project>();

//  request the project detail by id
const { data, pending, error } = await useFetch<Project>(
  `/api/projects/${route.params.id}`,
  { lazy: true }
);
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
  });
}
if (data.value) {
  project.value = data.value;
}
</script>
