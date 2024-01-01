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

    const { option } = useMapChart(projectsRenderList);
    expect((option.value?.series as { data: MapData[] }[])?.[0].data).toEqual([
      { name: "Alabama", value: 3 },
      { name: "New Mexico", value: 1 },
      { name: "Ohio", value: 4 },
      { name: "Washington", value: 1 },
      { name: "Maryland", value: 2 },
      { name: "Virginia", value: 4 },
      { name: "Pennsylvania", value: 3 },
      { name: "California", value: 3 },
      { name: "Colorado", value: 1 },
      { name: "Montana", value: 1 },
      { name: "New York", value: 1 },
      { name: "North Carolina", value: 1 },
      { name: "South Dakota", value: 1 },
      { name: "Texas", value: 1 },
    ]);
  });
});
