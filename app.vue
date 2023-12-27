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

html {
  font-family: "Open Sans", "Verdana", "Helvetica", sans-serif;
}

#__nuxt {
  background-image: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.1)
    ),
    url("/assets/images/blue-marble-4col.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
