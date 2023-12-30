import type { Projects } from "~/types";

export default defineEventHandler(async (event) => {
  const query: { searchQuery: string } = getQuery(event);
  const data: Projects = await $fetch(
    `https://techport.nasa.gov/api/projects/search?searchQuery=${query.searchQuery}`
  );
  // console.log(data);

  return data;
});
