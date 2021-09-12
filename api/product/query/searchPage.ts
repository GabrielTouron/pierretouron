export const SEARCH_PAGE_QUERY = `query MyQuery {
  allProducts {
    price
    name
    description
    id
    categories {
      name
    }
    image {
      url
    }
    state {
      name
      colorStatus {
        hex
      }
      available
    }
    createdAt
    shipping
    productTechnique {
      name
    }
    productDetail {
      name
    }
  }
  allProductCategories(orderBy: order_ASC) {
    name
    id
    order
  }
}`