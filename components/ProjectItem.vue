<template>
  <div class="">
    <div class="flex mb-2">
      <NuxtLink
        class="font-bold text-sky-800 hover:text-sky-600 text-lg truncate"
        :to="`/details/${project.projectId}`"
        >{{ project.title }}</NuxtLink
      >
      <span
        class="text-white rounded shadow px-2 py-1 ml-auto"
        :class="statusClass"
        >{{ project.statusDescription }}</span
      >
    </div>
    <div class="flex">
      <NuxtImg
        class="mr-8 rounded-lg"
        alt="project image"
        width="200"
        :src="`https://techport.nasa.gov/view/${project.projectId}/image`"
      />
      <div class="flex flex-col flex-1">
        <description-item
          label="Responsible Mission Directorate"
          :value="project.responsibleMd?.organizationName"
        />
        <description-item
          label="Lead Organization"
          :value="project.leadOrganization?.organizationName"
        />
        <description-item
          label="Primary Technology Area"
          :value="`${project.primaryTaxonomyNodes?.[0]?.code} ${project.primaryTaxonomyNodes?.[0]?.title}`"
        />
      </div>
      <div class="flex flex-col flex-1">
        <description-item
          label="Program Director"
          :value="`${project.programDirectors?.[0]?.firstName} ${project.programDirectors?.[0]?.lastName}`"
        />
        <description-item
          v-if="project.programManagers?.[0]?.firstName"
          label="Program Manager"
          :value="`${project.programManagers?.[0]?.firstName} ${project.programManagers?.[0]?.lastName}`"
        />
      </div>
      <div class="flex flex-col flex-1">
        <description-item
          label="Start"
          :value="`${convertMonth(project.startMonth)} ${project.startYear}`"
        />
        <description-item
          label="End"
          :value="`${convertMonth(project.endMonth)} ${project.endYear}`"
        />
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
