import { describe, expect, it } from "vitest";

describe("map status to tailwind class", () => {
  it("should return empty string", () => {
    expect(convertStatusClass("")).toBe("");
  });

  it("should return bg-emerald-500", () => {
    expect(convertStatusClass("Active")).toBe("bg-emerald-500");
  });

  it("should return bg-sky-500", () => {
    expect(convertStatusClass("Completed")).toBe("bg-sky-500");
  });

  it("should return bg-rose-500", () => {
    expect(convertStatusClass("Canceled")).toBe("bg-rose-500");
  });

  it("should return bg-orange-500", () => {
    expect(convertStatusClass("Not Started")).toBe("bg-orange-500");
  });
});
