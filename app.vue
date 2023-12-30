<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage :keepalive="true" />
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

body {
  background: #000;
}

#__nuxt {
  background: linear-gradient(to right bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.1)), url("/assets/images/blue-marble-4col.jpg") center top no-repeat;
  background-attachment: fixed;
  background-size: 100% auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
