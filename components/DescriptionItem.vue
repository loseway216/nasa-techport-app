<template>
  <div :class="`flex-1 flex ${layout == 'row' ? 'items-center' : 'flex-col'}`">
    <div class="text-sm font-semibold mr-2 mb-2 after:content-[':']">
      {{ label }}
    </div>
    <!-- TODO: email slot -->
    <div class="text-sm truncate mb-2" :title="value">{{ value }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: any;
  layout?: "row" | "col";
}>();
</script>
