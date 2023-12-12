import { defineEventHandler, parseCookies, getRequestHeaders, proxyRequest } from 'h3'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nuxtFetch from '#nuxtFetch'

import type { H3Event } from 'h3'

const nuxtFetchKey = Object.keys(nuxtFetch)

export default defineEventHandler(async (event: H3Event) => {
  const apiBase = `/${event.node.req.url?.split('/')[1]}`

  if (nuxtFetchKey.includes(apiBase)) {
    const options = nuxtFetch[apiBase]
    let apiHost =
      process.env[options.apiHostEnv] || options.apiHostUrl || event.node.req.headers.host || ''

    apiHost = apiHost.endsWith('/') ? apiHost.slice(0, -1) : apiHost

    let path = event.node.req.url

    if (options.pathRewrite && Object.keys(options.pathRewrite).length > 0) {
      const key = Object.keys(options.pathRewrite)[0]
      const regex = new RegExp(key)

      const apiBase = options.pathRewrite[key].startsWith('/')
        ? options.pathRewrite[key]
        : `/${options.pathRewrite[key]}`

      path = event.node.req.url?.replace(regex, apiBase)
    }

    const url = `${apiHost}${path}`

    const headers = getRequestHeaders(event)

    const cookies = parseCookies(event)

    headers['Authorization'] = cookies[options.cookieName || 'access_token'] || 'none'
    return proxyRequest(event, url, { headers })
  }
})
