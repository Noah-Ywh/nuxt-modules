# @noahyu/nuxt-route

> Secure and easy route ability integration with Nuxt.js

## Usage

```bash
npm install @noahyu/nuxt-route --save
# or
pnpm add @noahyu/nuxt-route -P
```

## Quick start

### Basic Configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    [
      '@noahyu/nuxt-route',
      {
        // 需要鉴权的 URL
        // 如果使用 `/` 结束，则以该标识开头的 URL 都需要登录后才能访问
        authPath: ['/order', '/personal/'],

        // 登录页的 URL
        loginPath: '/login',

        // 根据所提供的 name，从 cookie 中获取 value
        // 如果 value 存在，则认为当前为登录状态
        cookieName: 'access_token',

        // 已登录状态下不允许访问的 URL
        // 例如：登录、注册页面，已登录状态访问这些页面将重定向到首页
        excludePath: ['/login', '/register'],

        // 您可以自定义 token 验证函数，当遇到需要鉴权的 URL 时，会执行该函数并且当返回 true 时通过验证
        validateToken: (token) => !!token,
      },
    ],
  ],
})
```

### Helper

- `useToLogin(fullPath: string, open?: '_blank'): void`

  - 记住 URL 并跳转到登录页
  - 登录成功后如果调用了 `useLoginSuccess` 将跳转到记住的 URL 地址
  - param `open` 是否新窗口(标签页)打开

```ts
// 记住 `/about` 并跳转到登录页
useToLogin('/about')
```

- `useLoginSuccess(token: string, options?: CookieOptions | string, to?: string): void`

  - 登录成功后调用，保存 `token` 到 cookie 以及执行页面跳转
  - `token` 将要写入 cookie 的值， name 为 `nuxtRoute.cookieName`
  - `options` 当为 `object` 类型时，作为 `useCookie` 的 `options`；当为 `string` 类型时，作为跳转的 URL 地址
  - `to` 跳转到该 URL 地址。具有最高优先级，哪怕 `options` 为 `string` 类型
  - 当 `options` 不为 `string` 类型，且 `to` 不存在时，则判断是否存在被拦截的 URL 或被 `useToLogin` 记录的 URL，存在则跳转到该 URL 地址，不存在则跳转到首页

```ts
const login = (token) => {
  // options 为 useCookie 的第二个参数，用于设置 cookie 的其他属性
  const options = {
    maxAge: 3600,
  }

  useLoginSuccess(token, options)
}
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023-present, Noah Yu
