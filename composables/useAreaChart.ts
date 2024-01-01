import type { EChartsOption } from "echarts/types/dist/shared";
import type { Project } from "~/types";

export const useAreaChart = (projects: Ref<Project[] | null>) => {
  const option = computed<EChartsOption>(() => {
    let map = {
      TX01: 0,
      TX02: 0,
      TX03: 0,
      TX04: 0,
      TX05: 0,
      TX06: 0,
      TX07: 0,
      TX08: 0,
      TX09: 0,
      TX10: 0,
      TX11: 0,
      TX12: 0,
      TX13: 0,
      TX14: 0,
      TX15: 0,
      TX16: 0,
    };
    // computed trl data
    projects.value?.forEach((project) => {
      if (project && project.primaryTaxonomyNodes?.length > 0) {
        const code = project.primaryTaxonomyNodes[0]?.code?.split(
          "."
        )?.[0] as keyof typeof map;
        map[code] += 1;
      }
    });

    const data: number[] = Object.entries(map).map((arr) => arr[1]);
    // console.log(data);

    return {
      title: {
        text: "Technology Areas",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "TX01",
          "TX02",
          "TX03",
          "TX04",
          "TX05",
          "TX06",
          "TX07",
          "TX08",
          "TX09",
          "TX10",
          "TX11",
          "TX12",
          "TX13",
          "TX14",
          "TX15",
          "TX16",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data,
          type: "line",
          areaStyle: {},
        },
      ],
    };
  });

  return { option };
};
