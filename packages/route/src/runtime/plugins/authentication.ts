import { defineNuxtPlugin, addRouteMiddleware, navigateTo, useCookie } from '#app'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nuxtRoute from '#nuxtRoute'

/**
 * @Describe 校验 URL 是否匹配
 * @param {string} to 待验证的 URL
 * @param {string} authPath 待匹配的 URL
 * @returns {string[]} 返回匹配成功的 URL
 */

const verifyPath = (to: string, authPath: string[]): string[] => {
  const path = to.split('?')[0]
  return authPath.filter((item) => {
    if (item.endsWith('/')) {
      return `${path}/`.startsWith(item)
    }
    return path === item
  })
}

export default defineNuxtPlugin(() => {
  /**
   * 定义全局路由中间件
   * -------------------------- */
  addRouteMiddleware(
    'authentication-middleware-global',
    (to) => {
      const authPathIsValid = verifyPath(to.path, nuxtRoute.authPath).length > 0
      /** 拦截条件
       *
       * - 待进入的页面需要鉴权
       * - cookie 中不存在 token 或自定义验证函数返回 false
       * -------------------------- */
      if (authPathIsValid) {
        const token = useCookie(`${nuxtRoute.cookieName}`).value || ''
        const cookieIsValid = !!useCookie(`${nuxtRoute.cookieName}`).value
        const tokenIsValid = nuxtRoute.validateToken?.(token) ?? 'not'

        /** cookie 中不存在 token 或自定义验证函数返回 false */
        if (!cookieIsValid || (tokenIsValid !== 'not' && !tokenIsValid)) {
          useCookie('next_path').value = to.fullPath

          return navigateTo(nuxtRoute.loginPath)
        }
      }

      const excludePathIsValid = verifyPath(to.path, nuxtRoute.excludePath).length > 0
      /** 拦截条件
       *
       * - 登录状态不可访问 excludePath 中定义的 URL
       * -------------------------- */
      if (excludePathIsValid) {
        const token = useCookie(`${nuxtRoute.cookieName}`).value || ''
        const cookieIsValid = !!useCookie(`${nuxtRoute.cookieName}`).value
        const tokenIsValid = nuxtRoute.validateToken?.(token) ?? 'not'

        if (cookieIsValid && !!tokenIsValid) {
          return navigateTo('/')
        }
        useCookie(`${nuxtRoute.cookieName}`).value = ''
      }
    },
    { global: true },
  )
})
