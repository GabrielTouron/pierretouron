import router from "next/router"

type CategoryQueryParams = { category?: string; sort?: string }

export const filter = (query: CategoryQueryParams): void => {
  const { category: urlCategory } = router.query
  const { category: clickCategory } = query

  if (
    (urlCategory == clickCategory && !!urlCategory) ||
    clickCategory === 'Tout'
  ) {
    const { category, ...rest } = router.query
    router.push({ pathname: '/search', query: rest })
    return
  }

  if (clickCategory !== 'Tout') {
    router.push({ query: { ...router.query, ...query } })
  }
}