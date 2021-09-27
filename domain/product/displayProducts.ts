import { useRouter } from "next/router";
import { Product } from ".";

export const displayProduct = (allProducts: Product[]): Product[] => {
  const router = useRouter();
  const { category, sort } = router.query;

  let products = category
    ? allProducts.filter((p: Product) => p.categories[0].name === category)
    : allProducts;

  products =
    sort === "price desc" ? products.sort((a: Product, b: Product) => b.price - a.price) : products;
  products =
    sort === "price asc" ? products.sort((a: Product, b: Product) => a.price - b.price) : products;
  products =
    sort === "new"
      ? products.sort((a: Product, b: Product) => {
          return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
        })
      : products;
  return products;
};
