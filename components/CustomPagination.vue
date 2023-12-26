<template>
  <div class="flex m-auto">
    <button class="button" @click="prevPage">prev</button>
    <button @click="nextPage">next</button>
    {{ `Page ${pageNumber} of ${totalPage}` }}
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
</script>
