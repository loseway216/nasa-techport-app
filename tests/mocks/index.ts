import { registerEndpoint } from "@nuxt/test-utils/runtime";
import detail_117100 from "./detail_117100";
import detail_117102 from "./detail_117102";
import detail_146990 from "./detail_146990";
import detail_146992 from "./detail_146992";
import detail_146993 from "./detail_146993";
import detail_146996 from "./detail_146996";
import detail_146997 from "./detail_146997";
import detail_146999 from "./detail_146999";
import detail_147002 from "./detail_147002";
import detail_147008 from "./detail_147008";
import detail_147010 from "./detail_147010";
import detail_147014 from "./detail_147014";
import detail_147018 from "./detail_147018";
import projects from "./projects";

export default function registerEndpoints() {
  // mock data
  registerEndpoint("/api/projects/147008", () => detail_147008);
  registerEndpoint("/api/projects/147002", () => detail_147002);
  registerEndpoint("/api/projects/147018", () => detail_147018);
  registerEndpoint("/api/projects/146996", () => detail_146996);
  registerEndpoint("/api/projects/147010", () => detail_147010);
  registerEndpoint("/api/projects/146990", () => detail_146990);
  registerEndpoint("/api/projects/146993", () => detail_146993);
  registerEndpoint("/api/projects/146992", () => detail_146992);
  registerEndpoint("/api/projects/147014", () => detail_147014);
  registerEndpoint("/api/projects/146999", () => detail_146999);
  registerEndpoint("/api/projects/117100", () => detail_117100);
  registerEndpoint("/api/projects/117102", () => detail_117102);
  registerEndpoint("/api/projects/146997", () => detail_146997);
  registerEndpoint("/api/projects", () => projects);
}
