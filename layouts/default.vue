<template>
  <main
    class="container font-sans bg-slate-950 border border-slate-500 rounded-lg shadow relative flex flex-1 flex-col mx-auto my-8"
  >
    <NuxtImg
      src="/TechPort-Logo-2018.png"
      alt="TechPort Logo"
      class="h-12 w-64 mb-4"
    />

    <slot />
  </main>
</template>

<style scoped>
.container {
  max-width: 80rem;
  min-height: 50rem;
  padding: 20px;
}
</style>
