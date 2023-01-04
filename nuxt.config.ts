// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Users table',
      meta: [
        { name: 'description', content: 'Users table.' }
      ],
    }
  },
  css: [
    '@/assets/styles/app.sass',
    '@/assets/styles/helpers.sass',
  ],
})
