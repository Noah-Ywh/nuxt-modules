export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt Modules',
    },
  },
  modules: [
    [
      '@noahyu/nuxt-fetch',
      {
        '/api': {
          pathRewrite: {
            '^/api': '/',
          },
          apiHostEnv: 'API_HOST',
          apiHostUrl: 'https://jsonplaceholder.typicode.com',
          cookieName: 'access_token',
        },
        '/example': {
          pathRewrite: {
            '^/example': '/',
          },
          apiHostEnv: 'API_HOST',
          apiHostUrl: 'https://jsonplaceholder.typicode.com',
          cookieName: 'access_token',
        },
      },
    ],
    [
      '@noahyu/nuxt-route',
      {
        authPath: ['/order/'],
        loginPath: '/login',
        cookieName: 'access_token',
        excludePath: ['/login', '/register'],
        validateToken: (token) => !!token,
      },
    ],
  ],
  devServer: {
    port: 3001,
  },
})
