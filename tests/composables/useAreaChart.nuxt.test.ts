import { describe, expect, it } from "vitest";
import registerEndpoints from "../mocks";

type EChartsOption = echarts.EChartsOption;

// mock data
registerEndpoints();

describe("useAreaChart", () => {
  it("should return area chart option", async () => {
    const { pagination, startIndex, endIndex, listChange } = usePagination();
    const { projectsRenderList } = await useProjects(
      pagination,
      startIndex,
      endIndex,
      listChange
    );

    const { option } = useAreaChart(projectsRenderList);
    expect((option.value?.series as { data: number[] }[])?.[0].data).toEqual([
      0, 0, 2, 0, 0, 0, 0, 1, 2, 1, 0, 3, 0, 0, 0, 0,
    ]);
  });
});
