<template>
  <div class="flex items-center m-auto justify-between">
    <a @click="firstPage">First</a>
    <a @click="prevPage">Previous</a>
    <div>
      <input type="number" :value="pageNumber" @change="pageChange" min="1" />
      of
      {{ totalPage }}
    </div>
    <a @click="nextPage">Next</a>
    <a @click="lastPage">Last</a>
    <div>
      <select :value="pageSize" @change="sizeChange">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      items per page
    </div>
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
  emit("change", pageNumber.value, val);
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

<style scoped>
.icon {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
