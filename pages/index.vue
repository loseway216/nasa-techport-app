<template>
  <div>
    <dashboard :projects="projectsRenderList" :loading="projectsRenderListPending" />

    <div class="bg-stone-200 flex-1 rounded">
      <div class="flex items-center p-2 flex-wrap space-y-2 sm:space-x-4">
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
        <spinner v-if="projectsListPending || projectsRenderListPending" />
        <li v-else v-for="project in projectsRenderList" :key="project.projectId">
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
import type { Project } from "~/types";

// pagination data and handler
const pagination = ref({
  total: 0,
  pageNumber: 1,
  pageSize: 10,
});

const paginationVal = pagination.value;
const startIndex = computed(() =>
  paginationVal.total === 0
    ? 0
    : (paginationVal.pageNumber - 1) * paginationVal.pageSize + 1
);
const endIndex = computed(() =>
  paginationVal.pageNumber * paginationVal.pageSize > paginationVal.total
    ? paginationVal.total
    : paginationVal.pageNumber * paginationVal.pageSize
);

function listChange(pageNumber: number, pageSize: number) {
  pagination.value.pageNumber = pageNumber;
  pagination.value.pageSize = pageSize;
}

// interval data
const interval = ref(7);
const dateStr = computed(() => convertDateStr(interval.value));

// get projects list in the last 7 days
// but /api/projects return almost nothing except id
// so we need to request project detail by id manually
const projectIdList = ref<number[]>([]);
const {
  data: projectsList,
  error,
  pending: projectsListPending,
} = await useFetch("/api/projects", {
  query: {
    updatedSince: dateStr,
  },
});
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
  });
}
if (projectsList.value) {
  projectIdList.value = projectsList.value.projectIdList;
  pagination.value.pageNumber = 1;
  pagination.value.total = projectsList.value.totalCount;
}
// update pagination data when projectsList change
watch(projectsList, (newVal) => {
  if (newVal) {
    projectIdList.value = newVal.projectIdList;
    pagination.value.pageNumber = 1;
    pagination.value.total = newVal.totalCount;
  }
});

// init projects map to cache projects data
const projectsMap = useState<Map<number, Project>>(
  "projectsMap",
  () => new Map()
);
// wrap multiple requests in one promise
const { data: projectsRenderList, pending: projectsRenderListPending } =
  useAsyncData(
    "projects-list",
    async () => {
      let result: Project[] = [];
      const cacheIndexArr: { index: number; projectId: number }[] = [];
      const projectsMapVal = projectsMap.value;

      const idArr = projectIdList.value?.slice(startIndex.value - 1, endIndex.value);

      if (idArr) {
        // create a parallel request
        const promiseArr = idArr.map((projectId, index) => {
          if (projectsMapVal.has(projectId)) {
            return Promise.resolve(projectsMapVal.get(projectId)!);
          } else {
            cacheIndexArr.push({ index, projectId });
            return $fetch(`/api/projects/${projectId}`);
          }
        });

        result = await Promise.all(promiseArr);

        // cache projects
        cacheIndexArr.forEach(({ index, projectId }) => {
          projectsMapVal.set(projectId, result[index]);
        });
      }

      return result;
    },
    {
      watch: [startIndex, endIndex],
    }
  );
</script>
