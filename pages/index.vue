<template>
  <div>List</div>
  <ul>
    <div>{{ pagination.total }}</div>
    <li v-for="project in projects" :key="project.projectId">
      <NuxtLink :to="`/details/${project.projectId}`">{{
        project.projectId
      }}</NuxtLink>
      {{ project.lastUpdated }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useProjectsStore } from "~/stores/projects";
import type { Project, Projects } from "~/types";

// init projects
const projects = useState<Project[]>("projects", () => []);

// init pagination
const pagination = useState("pagination", () => ({
  total: 0,
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  // showTotal: (total: number) => `Total ${total} items`,
}));

// computed charts data

function setProjects(data: Projects) {
  projects.value = data.projects;
  pagination.value.total = data.totalCount;
}

function updateProjects(data: Project) {
  projects.value = projects.value.map((project) =>
    project.projectId === data.projectId ? data : project
  );
}

// get projects id list in the last 7 days
// const { data, error, pending } = await useFetch("/api/projects", {
//   params: {
//     updatedSince: "2023-12-20",
//   },
// });
// if (error.value) {
//   throw createError({
//     statusCode: error.value.statusCode,
//     message: error.value.message,
//   });
// }
// if (data.value) {
//   setProjects(data.value);
// }

const store = useProjectsStore();
store.getProjects("2023-12-20");
</script>
