import { describe, expect, it } from "vitest";

describe("convert a interval number to YYYY-MM-DD string", () => {
  it("should return empty string", () => {
    expect(convertDateStr(NaN)).toBe("");
  });

  it("should return empty string", () => {
    expect(convertDateStr(-1)).toBe("");
  });

  it("should return a YYYY-MM-DD", () => {
    expect(convertDateStr(7)).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
