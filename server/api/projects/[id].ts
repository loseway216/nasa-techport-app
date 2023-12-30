import type { Project } from "~/types";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  const data: { project: Project } = await $fetch(
    `https://techport.nasa.gov/api/projects/${id}`
  );

  // console.log(data.project.projectId);

  return data.project;
});
