// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/projects/**": { cors: true },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/test-utils/module"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  experimental: {
    asyncContext: true,
  },
});
