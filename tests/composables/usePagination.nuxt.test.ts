import { describe, expect, it } from "vitest";

describe("usePagination", () => {
  it("should return default pagination config", () => {
    const { pagination, startIndex, endIndex, listChange } = usePagination();

    expect(pagination.value).toEqual({
      total: 0,
      pageNumber: 1,
      pageSize: 10,
    });
    expect(startIndex.value).toBe(0);
    expect(endIndex.value).toBe(0);
    expect(listChange).toBeInstanceOf(Function);
  });

  it("should update pagination", () => {
    const { pagination, startIndex, endIndex, listChange } = usePagination();

    listChange(2, 20, 100);
    expect(pagination.value).toEqual({
      total: 100,
      pageNumber: 2,
      pageSize: 20,
    });
    expect(startIndex.value).toBe(21);
    expect(endIndex.value).toBe(40);

    listChange(4, 10, 33);
    expect(pagination.value).toEqual({
      total: 33,
      pageNumber: 4,
      pageSize: 10,
    });
    expect(startIndex.value).toBe(31);
    expect(endIndex.value).toBe(33);
  });
});
