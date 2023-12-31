<template>
  <div v-if="projectDetail" class="flex flex-col flex-1">
    <h1 class="text-3xl text-white font-medium mb-1">
      {{ projectDetail.title }}
    </h1>
    <div class="flex items-center mb-1">
      <span class="text-white rounded shadow p-1 text-sm mb-2 inline-block mr-2" :class="statusClass">{{
        projectDetail.statusDescription }} Technology Project</span>
      <span class="rounded shadow p-1 text-sm mb-2 inline-block bg-stone-200">{{ projectDetail.viewCount }} views</span>
      <button class="ml-auto h-8 px-6 font-semibold rounded-md bg-stone-200" @click="() => router.go(-1)">Back</button>
    </div>

    <div class="bg-stone-200 flex-1 rounded grid grid-rows-3 grid-cols-1 sm:grid-cols-4 gap-0 sm:gap-4 p-4"
      style="grid-template-rows: repeat(3, min-content)">
      <div class="col-span-3">
        <h2 class="text-2xl font-semibold mb-2">Project Description</h2>
        <div class="text-xs max-h-48 overflow-auto" v-html="projectDetail.description || 'No project description provided yet.'
          "></div>
      </div>
      <div class="col-span-3">
        <h2 class="text-2xl font-semibold mb-2">Anticipated Benefits</h2>
        <div class="text-xs max-h-48 overflow-auto" v-html="projectDetail.benefits || 'No anticipated benefits provided yet.'
          "></div>
      </div>
      <div class="col-span-3">
        <h2 class="text-2xl font-semibold mb-2">
          Primary U.S. Work Locations and Key Partners
        </h2>
        <client-only fallback="Loading...">
          <v-chart class="h-full w-full" style="min-height: 26rem" :option="option" autoresize />
        </client-only>
      </div>
      <div class="row-span-full sm:col-start-4 col-start-1 grid grid-cols-subgrid gap-4">
        <NuxtImg class="rounded-lg w-full" alt="project image"
          :src="`https://techport.nasa.gov/view/${projectDetail.projectId}/image`" />
        <div class="overflow-hidden">
          <h2 class="text-2xl font-semibold mb-2">
            Organizational Responsibility
          </h2>
          <description-item label="Responsible Mission Directorate"
            :value="projectDetail.responsibleMd?.organizationName" />
          <description-item label="Lead Organization" :value="projectDetail.leadOrganization?.organizationName" />
          <description-item v-if="projectDetail.program.title" label="Responsible Program"
            :value="projectDetail.program.title" />
        </div>
        <div class="overflow-hidden">
          <h2 class="text-2xl font-semibold mb-2">Project Management</h2>
          <description-item v-if="projectDetail.programDirectors?.[0]?.firstName" label="Program Director">
            <template #email>
              <a class="text-sky-500 hover:underline"
                :href="`mailto:${projectDetail.programDirectors?.[0]?.primaryEmail}`">{{
                  `${projectDetail.programDirectors?.[0]?.firstName} ${projectDetail.programDirectors?.[0]?.lastName}`
                }}</a>
            </template>
          </description-item>
          <description-item v-if="projectDetail.programExecutives?.[0]?.firstName" label="Program Executive">
            <template #email>
              <a class="text-sky-500 hover:underline"
                :href="`mailto:${projectDetail.programExecutives?.[0]?.primaryEmail}`">{{
                  `${projectDetail.programExecutives?.[0]?.firstName} ${projectDetail.programExecutives?.[0]?.lastName}`
                }}</a>
            </template></description-item>
          <description-item v-if="projectDetail.programManagers?.[0]?.firstName" label="Program Manager">
            <template #email>
              <a class="text-sky-500 hover:underline"
                :href="`mailto:${projectDetail.programManagers?.[0]?.primaryEmail}`">{{
                  `${projectDetail.programManagers?.[0]?.firstName} ${projectDetail.programManagers?.[0]?.lastName}`
                }}</a>
            </template>
          </description-item>
          <description-item v-if="projectDetail.projectManagers?.[0]?.firstName" label="Project Manager">
            <template #email>
              <a class="text-sky-500 hover:underline"
                :href="`mailto:${projectDetail.projectManagers?.[0]?.primaryEmail}`">{{
                  `${projectDetail.projectManagers?.[0]?.firstName} ${projectDetail.projectManagers?.[0]?.lastName}`
                }}</a>
            </template>
          </description-item>
          <description-item v-if="projectDetail.principalInvestigators?.[0]?.firstName" label="Principal Investigator">
            <template #email>
              <a class="text-sky-500 hover:underline"
                :href="`mailto:${projectDetail.principalInvestigators?.[0]?.primaryEmail}`">{{
                  `${projectDetail.principalInvestigators?.[0]?.firstName}
                                ${projectDetail.principalInvestigators?.[0]?.lastName}`
                }}</a>
            </template>
          </description-item>
          <description-item v-if="projectDetail.coInvestigators?.[0]?.firstName" label="Co-Investigator">
            <template #email>
              <a class="text-sky-500 hover:underline"
                :href="`mailto:${projectDetail.coInvestigators?.[0]?.primaryEmail}`">{{
                  `${projectDetail.coInvestigators?.[0]?.firstName} ${projectDetail.coInvestigators?.[0]?.lastName}`
                }}</a>
            </template>
          </description-item>
        </div>
        <div class="overflow-hidden">
          <h2 class="text-2xl font-semibold mb-2">Project Duration</h2>
          <div class="flex">
            <description-item layout="row" label="Start" :value="`${convertMonth(projectDetail.startMonth)} ${projectDetail.startYear
                }`" />
            <description-item layout="row" label="End" :value="`${convertMonth(projectDetail.endMonth)} ${projectDetail.endYear
              }`" />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-stone-200 rounded p-4 mt-2">
      <organizations :organizations="[
        projectDetail.leadOrganization,
        ...(projectDetail.supportingOrganizations || []),
      ]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";

const router = useRouter();
const route = useRoute();

// prevent user input an invalid projectId manually
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id as string);
  },
});

// get project detail from cache or request
const { projectDetail } = await useProjectDetail(Number(route.params.id));

// compute status color
const statusClass = computed(() => convertStatusClass(projectDetail.value!.statusDescription));

// map chart
const projects = computed(() => [projectDetail.value!]);
const { option } = useMapChart(projects, false);
</script>
