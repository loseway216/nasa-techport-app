import type { Pagination, Project } from "~/types";

export const useProjects = async (
  pagination: Ref<Pagination>,
  startIndex: Ref<number>,
  endIndex: Ref<number>,
  listChange: (pageNumber: number, pageSize: number, total?: number) => void
) => {
  // init projects map to cache projects data
  const projectsMap = useState<Map<number, Project>>(
    "projectsMap",
    () => new Map()
  );
  // interval data
  const interval = ref(7);
  const dateStr = computed(() => convertDateStr(interval.value));

  // get projects list in the last 7 days
  // but /api/projects return almost nothing except id
  // so we need to request project detail by id manually
  const {
    data: projectsList,
    error,
    pending: projectsListPending,
  } = await useFetch("/api/projects", {
    query: { updatedSince: dateStr },
  });
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
    });
  }
  // update pagination data when projectsList change
  watchEffect(() => {
    if (projectsList.value) {
      listChange(1, pagination.value.pageSize, projectsList.value.totalCount);
    }
  });

  // wrap multiple requests in one promise
  const { data: projectsRenderList, pending: projectsRenderListPending } =
    await useAsyncData(
      "projects-list",
      async () => {
        let result: Project[] = [];
        const cacheIndexArr: { index: number; projectId: number }[] = [];
        const projectsMapVal = projectsMap.value;

        const idArr = projectsList.value?.projectIdList.slice(
          startIndex.value - 1,
          endIndex.value
        );

        if (idArr) {
          // create a parallel request
          const promiseArr = idArr.map((projectId, index) => {
            if (projectsMapVal.has(projectId)) {
              // return Promise.resolve(projectsMapVal.get(projectId)!);
              // mock a delay
              return new Promise((resolve: (arg0: Project) => void) => {
                setTimeout(() => {
                  resolve(projectsMapVal.get(projectId)!);
                }, 100);
              });
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

  // preload and cache next page's data
  watch(endIndex, (newVal) => {
    const idArr = projectsList.value?.projectIdList.slice(
      newVal,
      Math.min(newVal + pagination.value.pageSize, pagination.value.total)
    );

    if (Array.isArray(idArr)) {
      idArr.forEach(async (projectId) => {
        if (!projectsMap.value.has(projectId)) {
          const data = await $fetch(`/api/projects/${projectId}`);
          if (data) {
            projectsMap.value.set(projectId, data);
          }
        }
      });
    }
  });

  return {
    interval,
    projectsRenderList,
    projectsRenderListPending,
    projectsListPending,
  };
};
