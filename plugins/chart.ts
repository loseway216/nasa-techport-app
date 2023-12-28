import * as echarts from "echarts";
import { BarChart, MapChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import USAJson from "~/assets/USA.json";

export default defineNuxtPlugin(() => {
  use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    BarChart,
    PieChart,
    MapChart,
  ]);

  echarts.registerMap("USA", USAJson as any, {
    Alaska: {
      left: -131,
      top: 25,
      width: 15,
    },
    Hawaii: {
      left: -110,
      top: 28,
      width: 5,
    },
    "Puerto Rico": {
      left: -76,
      top: 26,
      width: 2,
    },
  });
});
