import { isLocale } from '~/config/docs-sources'

export default defineNuxtRouteMiddleware((to) => {
  const locale = to.params.locale

  if (typeof locale === 'string' && !isLocale(locale)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Locale not found',
      fatal: true
    })
  }
})
