export default defineEventHandler(async () => {
  const nav = await queryCollectionNavigation('sdk_docs_en')
  return JSON.stringify(nav, null, 2)
})
