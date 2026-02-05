export default defineEventHandler(async () => {
  const nav = await queryCollectionNavigation('sdk_docs')
  return JSON.stringify(nav, null, 2)
})
