import * as echarts from "echarts";
import type { Project } from "~/types";

type EChartsOption = echarts.EChartsOption;

interface MapData {
  name: string;
  value: number;
}

export const useMapChart = (projects: Ref<Project[] | null>) => {
  const option = computed<EChartsOption>(() => {
    // computed states map data
    const data: MapData[] =
      projects.value?.reduce((acc, cur) => {
        if (cur && cur.statesWithWork) {
          cur.statesWithWork.forEach((organization) => {
            const index = acc.findIndex(
              (item) => item.name === organization.name
            );
            if (index === -1) {
              acc.push({
                name: organization.name,
                value: 1,
              });
            } else {
              acc[index].value++;
            }
          });
        }
        return acc;
      }, [] as MapData[]) ?? [];

    // console.log(data);

    return {
      title: { text: "States with Work" },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "left",
        type: "piecewise",
        pieces: [
          { min: 1, max: 4, label: "1 to 4" },
          { min: 5, max: 9, label: "5 to 9" },
          { min: 10, max: 24, label: "10 to 24" },
          { min: 25, label: "25 or more" },
        ],
      },
      series: [
        {
          name: "Primary U.S. Work Locations",
          type: "map",
          roam: false, // zoom
          map: "USA",
          emphasis: {
            label: {
              show: true,
            },
          },
          data,
        },
      ],
    };
  });

  return { option };
};
