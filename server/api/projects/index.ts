import type { Projects } from "~/types";

export default defineEventHandler(async (event) => {
  const query: { updatedSince: string } = getQuery(event);

  const data: Projects = await $fetch(
    `${process.env.NASA_API}/projects?updatedSince=${query.updatedSince}`
  );

  // console.log(data, query.updatedSince);

  return {
    projectIdList: data.projects?.map((project) => project.projectId) ?? [],
    totalCount: data.totalCount ?? 0,
  };
});
