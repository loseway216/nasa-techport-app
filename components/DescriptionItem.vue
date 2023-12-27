<template>
  <div
    :class="`mb-2 flex-1 flex ${layout == 'row' ? 'items-center' : 'flex-col'}`"
  >
    <div class="text-sm font-semibold mr-2 mb-1 after:content-[':']">
      {{ label }}
    </div>
    <div class="text-xs">{{ value }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: any;
  layout?: "row" | "col";
}>();
</script>
