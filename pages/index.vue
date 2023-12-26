<template>
  <div>
    <ul>
      <div class="flex">
        <div>
          {{ `Listing ${startIndex} - ${endIndex} of ${pagination.total}` }}
        </div>
        <custom-pagination :pagination="pagination" @change="listChange" />
      </div>
      <div v-if="projectsListPending || projectsRenderListPending">
        Loading...
      </div>
      <li v-else v-for="project in projectsRenderList" :key="project.projectId">
        <project-item :project="project" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Project } from "~/types";

// init projects map to cache projects data
const projectsMap = useState<Map<number, Project>>(
  "projectsMap",
  () => new Map()
);
const pagination = ref({
  total: 0,
  pageNumber: 1,
  pageSize: 10,
});

// computed data
const paginationVal = pagination.value;
const startIndex = computed(
  () => (paginationVal.pageNumber - 1) * paginationVal.pageSize + 1
);
const endIndex = computed(() =>
  paginationVal.pageNumber * paginationVal.pageSize > paginationVal.total
    ? paginationVal.total
    : paginationVal.pageNumber * paginationVal.pageSize
);

// computed charts data

// get projects list in the last 7 days
// but /api/projects return almost nothing except id
const {
  data: projectsList,
  error,
  pending: projectsListPending,
} = await useFetch("/api/projects", {
  params: {
    updatedSince: "2023-12-20",
  },
});
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
  });
}
if (projectsList.value) {
  pagination.value.pageNumber = 1;
  pagination.value.total = projectsList.value.totalCount;
}

// request project detail and cache it
const { data: projectsRenderList, pending: projectsRenderListPending } =
  useAsyncData(
    "projects-list",
    async () => {
      let result: Project[] = [];
      const cacheIndexArr: { index: number; projectId: number }[] = [];
      const projectsMapVal = projectsMap.value;

      const idArr = projectsList.value?.projects
        .slice(startIndex.value - 1, endIndex.value)
        .map((project) => project.projectId);

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

function listChange(pageNumber: number, pageSize: number) {
  pagination.value.pageNumber = pageNumber;
  pagination.value.pageSize = pageSize;
}
</script>
