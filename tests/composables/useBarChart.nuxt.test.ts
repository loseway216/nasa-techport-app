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

    const { option } = useBarChart(projectsRenderList);
    expect((option.value?.series as { data: number[] }[])?.[0].data).toEqual([
      3, 37, 0, 0, 0, 1, 12, 1,
    ]);
  });
});
