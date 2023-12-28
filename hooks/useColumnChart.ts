import * as echarts from "echarts";
import type { Project } from "~/types";

type EChartsOption = echarts.EChartsOption;

const xAxisData = [
  "TRL 1",
  "TRL 2",
  "TRL 3",
  "TRL 4",
  "TRL 5",
  "TRL 6",
  "TRL 7",
  "TRL 8",
  "TRL 9",
];

export default function useMapChart(projects: (Project | undefined)[]) {
  const option = computed<EChartsOption>(() => {
    // computed trl data
    const data: number[] =
      projects?.reduce(
        (acc, cur) => {
          if (cur && cur.currentTrl) {
            acc[cur.currentTrl - 1]++;
          }
          return acc;
        },
        [0, 0, 0, 0, 0, 0, 0, 0, 0] as number[]
      ) ?? [];

    // console.log(data);

    return {
      title: {
        text: "Technology Readiness Level",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: xAxisData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data,
          type: "bar",
        },
      ],
    };
  });

  return { option };
}
