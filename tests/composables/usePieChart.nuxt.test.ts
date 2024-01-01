import { describe, expect, it } from "vitest";
import type { MapData } from "~/types";
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

    const { option } = usePieChart(projectsRenderList);
    expect((option.value?.series as { data: MapData[] }[])?.[0].data).toEqual([
      { name: "Active", value: 10 },
    ]);
  });
});
