import { ProductsFragment } from "./../../graphql/generated";

type Router = string | string[] | undefined;

type FilteredProducts = {
  products: ProductsFragment[];
  category: Router;
  sort: Router;
};

export const getFilteredProducts = (filteredProducts: FilteredProducts): ProductsFragment[] => {
  const { products, category, sort } = filteredProducts;

  let productList = products;

  // Filter by category
  if (category) {
    productList = products.filter((p: ProductsFragment) => p.categories[0].name === category);
  }

  // Sort by descendant price
  if (sort === "price desc") {
    productList = productList.sort((a: ProductsFragment, b: ProductsFragment) => b.price - a.price);
  }

  // Sort by ascendant price
  if (sort === "price asc") {
    productList = productList.sort((a: ProductsFragment, b: ProductsFragment) => a.price - b.price);
  }

  // Sort by new
  if (sort === "new") {
    productList = productList.sort((a: ProductsFragment, b: ProductsFragment) => {
      return new Date(a?.createdAt) < new Date(b?.createdAt) ? 1 : -1;
    });
  }

  return productList;
};
