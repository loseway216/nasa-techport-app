<template>
  <div v-if="projectDetail" class="flex flex-col flex-1">
    <h1 class="text-3xl text-white font-medium mb-1">
      {{ projectDetail.title }}
    </h1>
    <span
      class="bg-slate-500 text-white rounded shadow p-1 text-sm mb-2 self-start"
      :class="statusClass"
      >{{ projectDetail.statusDescription }} Technology Project</span
    >
    <div
      class="bg-stone-200 flex-1 rounded grid grid-rows-3 grid-cols-4 gap-4 p-4"
    >
      <div class="col-span-3">
        <h2 class="sub-title">Project Description</h2>
        <!-- TODO: read more -->
        <div
          class="text-xs text-ellipsis overflow-hidden max-h-48"
          v-html="projectDetail.description"
        ></div>
      </div>
      <div class="col-span-3">
        <h2 class="sub-title">Anticipated Benefits</h2>
        <div
          class="text-xs text-ellipsis overflow-hidden max-h-48"
          v-html="projectDetail.benefits"
        ></div>
      </div>
      <div class="col-span-3">
        <h2 class="sub-title">Primary U.S. Work Locations and Key Partners</h2>
      </div>
      <div class="row-span-full col-start-4 grid grid-cols-subgrid gap-4">
        <div>
          <h2 class="sub-title">Organizational Responsibility</h2>
          <description-item
            label="Responsible Mission Directorate"
            :value="projectDetail.responsibleMd.organizationName"
          />
          <description-item
            label="Lead Organization"
            :value="projectDetail.leadOrganization.organizationName"
          />
          <description-item
            label="supporting Organization"
            :value="projectDetail.supportingOrganizations?.[0].organizationName"
          />
        </div>
        <div>
          <h2 class="sub-title">Project Management</h2>
          <description-item
            label="Program Director"
            :value="`${projectDetail.programDirectors?.[0]?.firstName} ${projectDetail.programDirectors?.[0]?.lastName}`"
          />
          <description-item
            v-if="projectDetail.programExecutives?.[0]?.firstName"
            label="Program Executive"
            :value="`${projectDetail.programExecutives?.[0]?.firstName} ${projectDetail.programExecutives?.[0]?.lastName}`"
          />
          <description-item
            v-if="projectDetail.programManagers?.[0]?.firstName"
            label="Program Manager"
            :value="`${projectDetail.programManagers?.[0]?.firstName} ${projectDetail.programManagers?.[0]?.lastName}`"
          />
          <description-item
            v-if="projectDetail.projectManagers?.[0]?.firstName"
            label="Project Manager"
            :value="`${projectDetail.projectManagers?.[0]?.firstName} ${projectDetail.projectManagers?.[0]?.lastName}`"
          />
          <description-item
            v-if="projectDetail.principalInvestigators?.[0]?.firstName"
            label="Principal Investigator"
            :value="`${projectDetail.principalInvestigators?.[0]?.firstName} ${projectDetail.principalInvestigators?.[0]?.lastName}`"
          />
        </div>
        <div>
          <h2 class="sub-title">Project Duration</h2>
          <div class="flex">
            <description-item
              layout="row"
              label="Start"
              :value="`${convertMonth(projectDetail.startMonth)} ${
                projectDetail.startYear
              }`"
            />
            <description-item
              layout="row"
              label="End"
              :value="`${convertMonth(projectDetail.endMonth)} ${
                projectDetail.endYear
              }`"
            />
          </div>
        </div>
        <div>
          <h2 class="sub-title">Technology Areas</h2>
        </div>
      </div>
    </div>
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

const statusClass = computed(() =>
  convertStatusClass(projectDetail.value!.statusDescription)
);
</script>

<style scoped>
.sub-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>