export interface Options {
  /**
   * 需要鉴权的 URL
   *
   * 如果使用 `/` 结束，则以该标识开头的 URL 都需要登录后才能访问
   */
  authPath: string[]

  /**
   * 登录页的 URL
   * - Default: '/login'
   */
  loginPath?: string

  /**
   * 根据所提供的 name，从 cookie 中获取 value
   *
   * 如果 value 存在，则认为当前为登录状态
   * - Default: 'access_token'
   */
  cookieName?: string | undefined | null

  /**
   * 已登录状态下不允许访问的 URL
   *
   * 例如：登录、注册页面，已登录状态访问这些页面将重定向到首页
   */
  excludePath: string[]

  /**
   * 验证 token 是否有效
   */
  validateToken?: (token: string) => boolean
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    nuxtRoute?: Partial<Options>
  }
  interface NuxtOptions {
    nuxtRoute?: Partial<Options>
  }
}

export {}
