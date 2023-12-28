<template>
  <div class="mb-4" style="min-height: 30rem">
    <client-only class="text-white flex items-center justify-center">
      <div class="grid grid-rows-2 grid-cols-4 gap-4" style="min-height: 30rem">
        <v-chart
          class="bg-stone-300 shadow rounded h-full w-full row-span-full col-span-2"
          :option="mapOption"
          autoresize
        />
        <v-chart
          class="bg-stone-300 shadow rounded h-full w-full"
          :option="statusOption"
          autoresize
        />
        <v-chart
          class="bg-stone-300 shadow rounded h-full w-full"
          :option="trlOption"
          autoresize
        />
        <v-chart
          class="bg-stone-300 shadow rounded h-full w-full"
          :option="orgOption"
          autoresize
        />
        <v-chart
          class="bg-stone-300 shadow rounded h-full w-full"
          :option="areaOption"
          autoresize
        />
      </div>
    </client-only>
  </div>
</template>
<script setup lang="ts">
import VChart from "vue-echarts";
import useAreaChart from "~/hooks/useAreaChart";
import useBarChart from "~/hooks/useBarChart";
import useColumnChart from "~/hooks/useColumnChart";
import useMapChart from "~/hooks/useMapChart";
import usePieChart from "~/hooks/usePieChart";
import type { Project } from "~/types";

const props = defineProps<{ projects: Project[]; loading: boolean }>();
const projects = computed(() => props.projects);

// charts hooks
const { option: mapOption } = useMapChart(projects);
const { option: statusOption } = usePieChart(projects);
const { option: trlOption } = useColumnChart(projects);
const { option: orgOption } = useBarChart(projects);
const { option: areaOption } = useAreaChart(projects);
</script>
