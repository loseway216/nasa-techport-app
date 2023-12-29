<template>
  <div class="bg-stone-300 shadow rounded p-2">
    <div class="flex mb-2 flex-col sm:flex-row">
      <NuxtLink class="font-bold text-sky-800 hover:text-sky-600 hover:underline text-lg truncate sm:max-w-full max-w-xs"
        :to="`/details/${project.projectId}`">{{ project.title }}</NuxtLink>
      <span class="text-white rounded shadow px-2 ml-0 sm:ml-auto w-fit" :class="statusClass">{{
        project.statusDescription }}</span>
    </div>
    <div class="flex space-y-2 sm:space-y-0 space-x-0 sm:space-x-4 flex-wrap sm:flex-nowrap">
      <NuxtImg class="rounded-lg w-60 h-auto sm:h-40 basis-full sm:basis-auto" alt="project image"
        :src="`https://techport.nasa.gov/view/${project.projectId}/image`" />
      <div class="flex flex-col flex-1 overflow-hidden basis-full sm:basis-0 max-w-xs sm:max-w-none">
        <description-item label="Responsible Mission Directorate" :value="project.responsibleMd?.organizationName" />
        <description-item label="Lead Organization" :value="project.leadOrganization?.organizationName" />
        <description-item v-if="project.primaryTaxonomyNodes?.length > 0" label="Primary Technology Area"
          :value="`${project.primaryTaxonomyNodes?.[0]?.code} ${project.primaryTaxonomyNodes?.[0]?.title}`" />
      </div>
      <div class="flex flex-col flex-1 overflow-hidden basis-1/2 sm:basis-0">
        <description-item v-if="project.programDirectors?.[0]?.firstName" label="Program Director"
          :value="`${project.programDirectors?.[0]?.firstName} ${project.programDirectors?.[0]?.lastName}`" />
        <description-item v-if="project.programManagers?.[0]?.firstName" label="Program Manager"
          :value="`${project.programManagers?.[0]?.firstName} ${project.programManagers?.[0]?.lastName}`" />
      </div>
      <div class="flex flex-col flex-1 overflow-hidden basis-1/2 sm:basis-0">
        <description-item label="Start" :value="`${convertMonth(project.startMonth)} ${project.startYear}`" />
        <description-item label="End" :value="`${convertMonth(project.endMonth)} ${project.endYear}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Project } from "~/types";

const props = defineProps<{ project: Project }>();

const statusClass = computed(() =>
  convertStatusClass(props.project.statusDescription)
);
</script>
