import { navigateTo, useCookie } from '#app'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nuxtRoute from '#nuxtRoute'

import type { CookieOptions } from '#app'

const verifyPath = (to: string, authPath: string[]): string[] => {
  const path = to.split('?')[0]
  return authPath.filter((item) => {
    if (item.endsWith('/')) {
      return `${path}/`.startsWith(item)
    }
    return path === item
  })
}

/**
 * @Describe 登录成功后调用
 * @param {string} token 将要写入 cookie 的值， name 为 `nuxtRoute.cookieName`
 */
export function useLoginSuccess(token: string): void
/**
 * @Describe 登录成功后调用
 * @param {string} token 将要写入 cookie 的值， name 为 `nuxtRoute.cookieName`
 * @param {string} to 跳转的目标 URl，该项具有最高优先级
 */
export function useLoginSuccess(token: string, to: string): void
/**
 * @Describe 登录成功后调用
 * @param {string} token 将要写入 cookie 的值， name 为 `nuxtRoute.cookieName`
 * @param {CookieOptions | string} options 当为 object 类型时，作为 useCookie 的 options；当为 string 类型时，作为跳转的目标 URl
 * @param {string} to 跳转的目标 URl，该项具有最高优先级
 */
export function useLoginSuccess(token: string, options: CookieOptions, to?: string): void
export function useLoginSuccess(token: string, options?: CookieOptions | string, to?: string) {
  useCookie(`${nuxtRoute.cookieName}`).value = token

  const nextPath = useCookie<string>('next_path', { maxAge: 10 })
  let toPath = to || nextPath.value || '/'

  if (typeof options === 'object') {
    useCookie(`${nuxtRoute.cookieName}`, options).value = token

    toPath = to || toPath
  } else if (typeof options === 'string') {
    toPath = to || options
  }

  toPath = verifyPath(toPath, nuxtRoute.excludePath).length > 0 ? '/' : toPath

  nextPath.value = ''
  return navigateTo(toPath)
}
