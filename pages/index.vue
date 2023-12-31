<template>
  <div>
    <spinner v-if="projectsListPending || projectsRenderListPending" />

    <dashboard :projects="projectsRenderList" :loading="projectsRenderListPending" />

    <div class="bg-stone-200 flex-1 rounded">
      <div class="flex items-center p-2 flex-wrap space-y-2 sm:space-x-4 h-auto sm:h-16">
        <div class="mr-auto">
          Showing
          {{ " " }}
          <span class="font-medium">{{ startIndex }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ endIndex }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ pagination.total }}</span>
          {{ " " }}
          results
        </div>
        <custom-pagination :pagination="pagination" @change="listChange" />
        <div class="ml-0 sm:ml-auto">
          Show last
          <input
            class="bg-white w-16 pl-2 py-1 border border-slate-300 rounded shadow-sm focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1"
            type="number" v-model.lazy="interval" />
          days' projects
        </div>
      </div>
      <ul class="p-2 space-y-4">
        <li v-for="project in projectsRenderList" :key="project.projectId">
          <project-item :project="project" />
        </li>
        <div class="w-full text-center text-xl p-12" v-if="projectsRenderList?.length == 0">
          No results found. Please change the interval.
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// pagination data and handler
const { pagination, startIndex, endIndex, listChange } = usePagination();

// projects data
const {
  interval,
  projectsRenderList,
  projectsRenderListPending,
  projectsListPending,
} = await useProjects(pagination, startIndex, endIndex, listChange);
</script>
