export const HOME_PAGE_QUERY = `query MyQuery {
  allProducts(orderBy: _createdAt_DESC, first: "1") {
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
  }
  contentHomePage {
    textPresentation(locale: fr)
  }
}`
