<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const token = useState("token");

token.value = await $fetch("/api/token");
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

#__nuxt {
  background-color: #eee;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
