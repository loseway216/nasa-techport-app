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
    `${process.env.NASA_API}/projects/${id}`
  );

  // console.log(data.project.projectId);
  console.log(
    data.project.projectId,
    data.project?.supportingOrganizations?.length
  );

  return data.project;
});
