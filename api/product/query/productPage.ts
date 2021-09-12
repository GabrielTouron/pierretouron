export const PRODUCT_QUERY = `query ProductBySlug($slug: String) {
  product(filter: {name: {eq: $slug}}) {
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
}`