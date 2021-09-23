import { request } from '../datocms'
import { HOME_PAGE_QUERY } from './query/homePage'
import { PRODUCT_QUERY } from './query/productPage'
import { SEARCH_PAGE_QUERY } from './query/searchPage'

export const fetchHomePageData = async () => {
  const { allProducts, contentHomePage } = await request({
    query: HOME_PAGE_QUERY,
  })
  return {
    product: allProducts[0],
    textPresentation: contentHomePage.textPresentation,
  }
}

export const fetchProductPageData = async (slug?: string | string[]) => {
  const { product } = await request({
    query: PRODUCT_QUERY,
    variables: { slug },
  })
  return product
}

export const fetchSearchPageData = async () => {
  const { allProducts, allProductCategories } = await request({
    query: SEARCH_PAGE_QUERY,
  })
  return { products: allProducts, productCategories: allProductCategories }
}
