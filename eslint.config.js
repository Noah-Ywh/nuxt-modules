// eslint.config.js
import noahyuConfig from '@noahyu/eslint-config-vue'

export default [
  /** 全局忽略 */
  {
    ignores: ['**/*/.nuxt/', '**/*/dist', '**/.*/'],
  },

  ...noahyuConfig,

  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      curly: ['error', 'multi-line'],
    },
  },
]
