import type { Project, Projects } from "~/types";

export const useProjectsStore = defineStore("projectsStore", {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    async getProjects(updatedSince: string) {
      const data = await $fetch<Projects>(
        `https://techport.nasa.gov/api/projects?updatedSince=${updatedSince}`
      );
    },
  },
});
