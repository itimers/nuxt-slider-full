//@ts-ignore
const isProd = process.env.NODE_ENV === 'production'
const base = isProd ? '/nuxt-cookie-system/' : '/'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: base,
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${base}favicon.ico`,
        },
      ],
    }
  },
  nitro: {
    preset: 'github-pages',
  }
})
