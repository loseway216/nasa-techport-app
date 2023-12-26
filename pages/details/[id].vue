<template>
  <div>
    {{ projectDetail?.title }}
  </div>
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
const projectId = computed(() => Number(route.params.id));

// init project detail
const projectDetail = ref<Project>();
const projectsMap = useState<Map<number, Project>>("projectsMap");

// if the project detail is cached, use it
if (projectsMap.value?.has(projectId.value)) {
  projectDetail.value = projectsMap.value.get(projectId.value);
}
//  request the project detail by id if it's not cached
else {
  const { data, pending, error } = await useFetch<Project>(
    `/api/projects/${route.params.id}`
  );
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
    });
  }
  if (data.value) {
    projectDetail.value = data.value;
  }
}
</script>
