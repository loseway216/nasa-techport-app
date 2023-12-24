// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: { enabled: true },

  devServer: {
    port: 8080,
  },

  modules: ["@pinia/nuxt"]
});