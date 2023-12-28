import * as echarts from "echarts";
import type { Project } from "~/types";

type EChartsOption = echarts.EChartsOption;

export default function useMapChart(projects: (Project | undefined)[]) {
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
    };
    // computed trl data
    projects?.forEach((project) => {
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
          ,
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
}
