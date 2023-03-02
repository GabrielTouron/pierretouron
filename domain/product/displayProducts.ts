import { useRouter } from "next/router";
import { ProductsFragment } from "./../../graphql/generated";

export const getFilteredProducts = (allProducts: ProductsFragment[]): ProductsFragment[] => {
  const router = useRouter();
  const { category, sort } = router.query;

  let productList = allProducts;

  if (category) {
    productList = allProducts.filter((p: ProductsFragment) => p.categories[0].name === category)
  }

  if (sort === "price desc") {
    productList = productList.sort((a: ProductsFragment, b: ProductsFragment) => b.price - a.price)
  } else if (sort === "price asc") {
    productList = productList.sort((a: ProductsFragment, b: ProductsFragment) => a.price - b.price)
  } else if (sort === "new") {
    productList = productList.sort((a: ProductsFragment, b: ProductsFragment) => {
      return new Date(a?.createdAt) < new Date(b?.createdAt) ? 1 : -1;
    })
  }

  return productList;
};
