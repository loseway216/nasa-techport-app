import type { Projects } from "~/types";

export default defineEventHandler(async (event) => {
  const query: { searchQuery: string } = getQuery(event);
  const data: Projects = await $fetch(
    `${process.env.NASA_API}/projects/search?searchQuery=${query.searchQuery}`
  );
  // console.log(data);

  return data;
});
