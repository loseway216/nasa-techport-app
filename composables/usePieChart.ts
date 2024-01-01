import type { EChartsOption } from "echarts/types/dist/shared";
import type { MapData, Project } from "~/types";

export const usePieChart = (projects: Ref<Project[] | null>) => {
  const option = computed<EChartsOption>(() => {
    // computed projects status data
    const data: MapData[] =
      projects.value?.reduce((acc, cur) => {
        if (cur && cur.statusDescription) {
          const index = acc.findIndex(
            (item) => item.name === cur.statusDescription
          );
          if (index === -1) {
            acc.push({
              name: cur.statusDescription,
              value: 1,
            });
          } else {
            acc[index].value++;
          }
        }
        return acc;
      }, [] as MapData[]) ?? [];

    // console.log(data);

    return {
      title: {
        text: "Project Status",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      color: ["#10b981", "#f43f5e", "#0ea5e9"],
      // legend: {
      //   orient: "vertical",
      //   left: "left",
      // },
      series: [
        {
          name: "Status",
          type: "pie",
          radius: "50%",
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  });

  return { option };
};
