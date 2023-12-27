// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/projects/**": { cors: true },
  },
  devtools: { enabled: true },
  devServer: {
    port: 8080,
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-icon", "@nuxt/image"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});