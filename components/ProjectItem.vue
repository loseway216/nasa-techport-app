<template>
  <div class="">
    <div class="flex">
      <NuxtLink class="flex-1" :to="`/details/${project.projectId}`">{{
        project.title
      }}</NuxtLink>
      <span>{{ project.statusDescription }}</span>
    </div>
    <div class="flex">
      <NuxtImg
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

defineProps<{ project: Project }>();
</script>
