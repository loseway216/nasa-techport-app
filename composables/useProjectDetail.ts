import type { Project } from "~/types";

export const useProjectDetail = async (projectId: number) => {
  // init project detail
  const projectDetail = ref<Project>();
  const projectsMap = useState<Map<number, Project>>("projectsMap");

  //if the project detail is cached, use it
  if (projectsMap.value?.has(projectId)) {
    projectDetail.value = projectsMap.value.get(projectId);
  }
  // request the project detail by id if it's not cached
  else {
    const { data, error } = await useFetch<Project>(
      `/api/projects/${projectId}`
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

  return {
    projectDetail,
  };
};
