<template>
  <div>
    <NuxtLink :to="`/details/${project.projectId}`">{{
      project.projectId
    }}</NuxtLink>
    {{ project.title }}
  </div>
</template>

<script setup lang="ts">
import { type Project } from "~/types";

defineProps<{ project: Project }>();
</script>
