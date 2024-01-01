import { describe, expect, it } from "vitest";

describe("convert a number to month string", () => {
  it("should return empty string", () => {
    expect(convertMonth(0)).toBe("");
  });

  it("should return empty string", () => {
    expect(convertMonth(13)).toBe("");
  });

  it("should return empty string", () => {
    expect(convertMonth(1.2)).toBe("");
  });

  it("should return empty string", () => {
    expect(convertMonth(-1)).toBe("");
  });

  it("should return Jan", () => {
    expect(convertMonth(1)).toBe("Jan");
  });

  it("should return Feb", () => {
    expect(convertMonth(2)).toBe("Feb");
  });

  it("should return Mar", () => {
    expect(convertMonth(3)).toBe("Mar");
  });

  it("should return Apr", () => {
    expect(convertMonth(4)).toBe("Apr");
  });

  it("should return May", () => {
    expect(convertMonth(5)).toBe("May");
  });

  it("should return Jun", () => {
    expect(convertMonth(6)).toBe("Jun");
  });

  it("should return Jul", () => {
    expect(convertMonth(7)).toBe("Jul");
  });

  it("should return Aug", () => {
    expect(convertMonth(8)).toBe("Aug");
  });

  it("should return Sep", () => {
    expect(convertMonth(9)).toBe("Sep");
  });

  it("should return Oct", () => {
    expect(convertMonth(10)).toBe("Oct");
  });

  it("should return Nov", () => {
    expect(convertMonth(11)).toBe("Nov");
  });

  it("should return Dec", () => {
    expect(convertMonth(12)).toBe("Dec");
  });
});
