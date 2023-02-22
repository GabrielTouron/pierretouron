import { useRouter } from "next/router";
import { ProductsFragment } from "./../../graphql/generated";

export const displayProduct = (allProducts: ProductsFragment[]): ProductsFragment[] => {
  const router = useRouter();
  const { category, sort } = router.query;

  let products = category
    ? allProducts.filter((p: ProductsFragment) => p.categories[0].name === category)
    : allProducts;

  products =
    sort === "price desc"
      ? products.sort((a: ProductsFragment, b: ProductsFragment) => b.price - a.price)
      : products;
  products =
    sort === "price asc"
      ? products.sort((a: ProductsFragment, b: ProductsFragment) => a.price - b.price)
      : products;
  products =
    sort === "new"
      ? products.sort((a: ProductsFragment, b: ProductsFragment) => {
          return new Date(a?.createdAt) < new Date(b?.createdAt) ? 1 : -1;
        })
      : products;
  return products;
};
