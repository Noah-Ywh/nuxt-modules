import { defineNuxtModule, createResolver, addTemplate, addPlugin, addImportsDir } from '@nuxt/kit'

import { defaults } from './config'

import type { Options } from './types'

export default defineNuxtModule<Options>({
  meta: {
    name: '@noahyu/nuxt-route',
    configKey: 'nuxtRoute',
    compatibility: {
      nuxt: '^3.11.1',
    },
  },
  defaults,
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    /** add route options template
     * -------------------------- */
    _options.cookieName = _options.cookieName || 'access_token'
    nuxt.options.alias['#nuxtRoute'] =
      addTemplate({
        filename: 'paint-module-route.mjs',
        write: true,
        getContents: () => `export default {
  authPath: ${JSON.stringify(_options.authPath)},
  loginPath: ${JSON.stringify(_options.loginPath)},
  cookieName: ${JSON.stringify(_options.cookieName)},
  excludePath: ${JSON.stringify(_options.excludePath)},
  validateToken: ${_options.validateToken}
}
`,
      }).dst || ''

    /** add route middleware
     * -------------------------- */
    addPlugin(resolve('./runtime/plugins/authentication'))

    /** add composables
     * -------------------------- */
    addImportsDir(resolve('runtime/composables'))
  },
})
