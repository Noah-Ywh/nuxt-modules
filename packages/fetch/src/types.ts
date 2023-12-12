export interface Options {
  /**
   * 改写请求路径前缀
   */
  pathRewrite?: Record<string, string>

  /**
   * 从环境变量获取目标服务器地址
   */
  apiHostEnv?: string

  /**
   * 目标服务器地址，若 `apiHostEnv` 存在则被忽略
   */
  apiHostUrl?: string

  /**
   * 授权码
   *
   * 根据所提供的 name，从 cookie 中获取 value 并写入到 headers['Authorization']
   * - headers['Authorization']
   * - Default: Cookies['access_token']
   */
  cookieName?: string
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    nuxtFetch?: Record<string, Partial<Options>>
  }
  interface NuxtOptions {
    nuxtFetch?: Record<string, Partial<Options>>
  }
}

export {}
