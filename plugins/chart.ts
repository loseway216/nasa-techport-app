import { BarChart, LineChart, MapChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { registerMap, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import USAJson from "~/assets/USA.json";

export default defineNuxtPlugin(({ vueApp }) => {
  use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    BarChart,
    PieChart,
    MapChart,
    LineChart,
  ]);

  registerMap("USA", USAJson as any, {
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
