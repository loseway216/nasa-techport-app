import type { Projects } from "~/types";

export default defineEventHandler(async (event) => {
  const query: { updatedSince: string } = getQuery(event);

  const data: Projects = await $fetch(
    `${process.env.NASA_API}/projects?updatedSince=${query.updatedSince}`
  );

  console.log(
    new Date().getMinutes(),
    new Date().getMilliseconds(),
    data.totalCount,
    query.updatedSince
  );

  return data;
});
