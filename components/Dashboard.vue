<template>
  <div class="mb-4 min-h-128">
    <client-only class="text-white flex items-center justify-center">
      <div class="min-h-128 grid sm:grid-rows-2 sm:grid-cols-4 grid-cols-1 sm:gap-4 gap-2">
        <v-chart class="bg-stone-300 shadow rounded h-full w-full sm:row-span-full sm:col-span-2 min-h-64 sm:min-h-0"
          :option="mapOption" autoresize />
        <v-chart class="bg-stone-300 shadow rounded h-full w-full min-h-64 sm:min-h-0" :option="statusOption"
          autoresize />
        <v-chart class="bg-stone-300 shadow rounded h-full w-full min-h-64 sm:min-h-0" :option="trlOption" autoresize />
        <v-chart class="bg-stone-300 shadow rounded h-full w-full min-h-64 sm:min-h-0" :option="orgOption" autoresize />
        <v-chart class="bg-stone-300 shadow rounded h-full w-full min-h-64 sm:min-h-0" :option="areaOption" autoresize />
      </div>
    </client-only>
  </div>
</template>
<script setup lang="ts">
import VChart from "vue-echarts";
import type { Project } from "~/types";

const props = defineProps<{ projects: Project[] | null; loading: boolean }>();
const projects = computed(() => props.projects);

// charts hooks
const { option: mapOption } = useMapChart(projects);
const { option: statusOption } = usePieChart(projects);
const { option: trlOption } = useColumnChart(projects);
const { option: orgOption } = useBarChart(projects);
const { option: areaOption } = useAreaChart(projects);
</script>
