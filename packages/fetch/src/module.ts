import { defineNuxtModule, createResolver, addServerHandler, addTemplate } from '@nuxt/kit'

import { defaults } from './config'

import type { Options } from './types'

export default defineNuxtModule<Record<string, Partial<Options>>>({
  meta: {
    name: '@noahyu/nuxt-fetch',
    configKey: 'nuxtFetch',
    compatibility: {
      nuxt: '^3.2.0',
    },
  },
  defaults,
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    /** add fetch options template
     * -------------------------- */
    nuxt.options.alias['#nuxtFetch'] =
      addTemplate({
        filename: 'paint-module-fetch.mjs',
        write: true,
        getContents: () => `export default ${JSON.stringify(_options, null, 2)}`,
      }).dst || ''

    /** add serverMiddleware
     * -------------------------- */
    addServerHandler({
      handler: resolver.resolve('./runtime/server/proxy'),
    })
  },
})
