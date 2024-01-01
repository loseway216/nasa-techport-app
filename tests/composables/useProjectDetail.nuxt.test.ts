import { describe, expect, it } from "vitest";
import registerEndpoints from "../mocks";

// mock data
registerEndpoints();

describe("useProjectDetail", () => {
  it("should return project detail", async () => {
    const { projectDetail } = await useProjectDetail(147008);

    expect(projectDetail.value?.projectId).toBe(147008);
    expect(projectDetail.value?.title).toBe(
      "Harmonia Radioisotope Power Supply for Artemis"
    );
  });
});
