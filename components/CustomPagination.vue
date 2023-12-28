<template>
  <div class="flex items-center justify-between space-x-2 basis-full sm:basis-auto order-1 sm:order-none">
    <button
      class="text-slate-800 shadow rounded border border-slate-500 h-8 w-20 bg-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      @click="firstPage" :disabled="pageNumber === 1">
      First
    </button>
    <button
      class="text-slate-800 shadow rounded border border-slate-500 h-8 w-20 bg-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      @click="prevPage" :disabled="pageNumber === 1">
      Previous
    </button>
    <span>Page</span>
    <input
      class="bg-white w-16 pl-2 py-1 border border-slate-300 rounded shadow-sm focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1"
      type="number" :value="pageNumber" @change="pageChange" min="1" />
    <span>of</span>
    <span class="font-semibold">
      {{ totalPage }}
    </span>
    <button
      class="text-slate-800 shadow rounded border border-slate-500 h-8 w-20 bg-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      @click="nextPage" :disabled="pageNumber === totalPage">
      Next
    </button>
    <button
      class="text-slate-800 shadow rounded border border-slate-500 h-8 w-20 bg-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      @click="lastPage" :disabled="pageNumber === totalPage">
      Last
    </button>
    <select
      class="bg-white w-16 pl-2 py-1 border border-slate-300 rounded shadow-sm focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-1"
      :value="pageSize" @change="sizeChange">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
    <span class="hidden sm:inline-block"> items per page </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pagination: {
    total: number;
    pageNumber: number;
    pageSize: number;
  };
}>();

const emit = defineEmits<{ change: [pageNumber: number, pageSize: number] }>();

const { total, pageNumber, pageSize } = toRefs(props.pagination);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

function pageChange(event: any) {
  const val = event.target.value;
  emit("change", Math.min(val, totalPage.value), pageSize.value);
}

function sizeChange(event: any) {
  const val = event.target.value;
  emit("change", 1, val);
}

function prevPage() {
  emit("change", Math.max(pageNumber.value - 1, 1), pageSize.value);
}

function nextPage() {
  emit(
    "change",
    Math.min(pageNumber.value + 1, totalPage.value),
    pageSize.value
  );
}

function firstPage() {
  emit("change", 1, pageSize.value);
}

function lastPage() {
  emit("change", totalPage.value, pageSize.value);
}
</script>
