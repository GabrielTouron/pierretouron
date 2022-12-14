import { request, request2 } from "../datocms";
import { HOME_PAGE_QUERY } from "./query/homePage";
import { PRODUCT_QUERY } from "./query/productPage";
// import { SEARCH_PAGE_QUERY } from './query/searchPage'
import { SearchPageQuery, SearchPageDocument } from "./../../graphql/generated";
// import env variables
// detect if env is localhost or not
export const isLocalhost = process.env.NODE_ENV === "development";

export const fetchHomePageData = async () => {
  const { allProducts, contentHomePage } = await request({
    query: HOME_PAGE_QUERY,
  });
  return {
    product: allProducts[0],
    textPresentation: contentHomePage.textPresentation,
  };
};

export const fetchProductPageData = async (slug?: string | string[]) => {
  const { product } = await request({
    query: PRODUCT_QUERY,
    variables: { slug },
  });
  return product;
};
