import * as echarts from "echarts";
import type { Project } from "~/types";

type EChartsOption = echarts.EChartsOption;

export const useBarChart = (projects: Ref<Project[] | null>) => {
  const option = computed<EChartsOption>(() => {
    let map = {
      Academia: 0,
      Industry: 0,
      "International Space Agency": 0,
      "Non-profit Institution": 0,
      "Other US Government": 0,
    };
    // computed organization data
    projects.value?.forEach((project) => {
      if (project && project.leadOrganization) {
        map[project.leadOrganization.organizationType] += 1;
      }
      if (project && project.supportingOrganizations?.length > 0) {
        project.supportingOrganizations.forEach((org) => {
          map[org.organizationType] += 1;
        });
      }
    });

    const data: number[] = Object.entries(map).map((arr) => arr[1]);

    // console.log(data);

    return {
      grid: {
        containLabel: true,
      },
      title: {
        text: "Lead and Supporting Organizations",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      yAxis: {
        data: [
          "Academia",
          "Industry",
          // "International Space Agency",
          "Non-profit Institution",
          "Other US Government",
        ],
        type: "category",
      },
      xAxis: {
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
};
