import type { Pagination } from "~/types";

export const usePagination = () => {
  const pagination = ref<Pagination>({
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  });

  // actual showing data range
  const paginationVal = toValue(pagination);
  const startIndex = computed(() =>
    paginationVal.total === 0
      ? 0
      : (paginationVal.pageNumber - 1) * paginationVal.pageSize + 1
  );
  const endIndex = computed(() =>
    paginationVal.pageNumber * paginationVal.pageSize > paginationVal.total
      ? paginationVal.total
      : paginationVal.pageNumber * paginationVal.pageSize
  );

  function listChange(pageNumber: number, pageSize: number, total?: number) {
    pagination.value.pageNumber = pageNumber;
    pagination.value.pageSize = pageSize;
    if (total) {
      pagination.value.total = total;
    }
  }

  return {
    pagination,
    startIndex,
    endIndex,
    listChange,
  };
};
