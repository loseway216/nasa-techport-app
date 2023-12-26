<template>
  <div>
    <ul>
      <div>
        <button class="button" @click="prevPage">prev</button>
        <button @click="nextPage">next</button>
        {{ `Listing ${startIndex} - ${endIndex} of ${pagination.total}` }}
        {{ `Page ${pagination.current} of ${totalPage}` }}
      </div>
      <li v-for="project in projectsRenderList" :key="project.projectId">
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
const pagination = useState("pagination", () => ({
  total: 0,
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  // showTotal: (total: number) => `Total ${total} items`,
}));

// computed data
const startIndex = computed(
  () => (pagination.value.current - 1) * pagination.value.pageSize + 1
);
const endIndex = computed(() =>
  pagination.value.current * pagination.value.pageSize > pagination.value.total
    ? pagination.value.total
    : pagination.value.current * pagination.value.pageSize
);
const totalPage = computed(() =>
  Math.ceil(pagination.value.total / pagination.value.pageSize)
);

function prevPage() {
  pagination.value.current = Math.max(pagination.value.current - 1, 1);
}
function nextPage() {
  pagination.value.current = Math.min(
    pagination.value.current + 1,
    totalPage.value
  );
}

// computed charts data

// get projects list in the last 7 days
// but /api/projects return almost nothing except id
const {
  data: projectsList,
  error,
  pending,
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
  pagination.value.current = 1;
  pagination.value.total = projectsList.value.totalCount;
}

// function updateProjects(data: Project) {
//   projects.value = projects.value.map((project) =>
//     project.projectId === data.projectId ? data : project
//   );
// }

function listChange() {}

// request project detail and cache it
const { data: projectsRenderList } = useAsyncData(
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
</script>
