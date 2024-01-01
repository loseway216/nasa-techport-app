import { describe, expect, it } from "vitest";
import registerEndpoints from "../mocks";

// mock data
registerEndpoints();

describe("useProjects", () => {
  it("should return projects", async () => {
    const { pagination, startIndex, endIndex, listChange } = usePagination();

    const {
      interval,
      projectsRenderList,
      projectsListPending,
      projectsRenderListPending,
    } = await useProjects(pagination, startIndex, endIndex, listChange);

    expect(interval.value).toBe(7);
    expect(projectsListPending.value).toBe(false);
    expect(projectsRenderListPending.value).toBe(false);

    expect(projectsRenderList.value?.length).toBe(10);
    expect(projectsRenderList.value?.[0].projectId).toBe(147008);
    expect(projectsRenderList.value?.[9].projectId).toBe(146999);
  });
});
