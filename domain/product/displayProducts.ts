import { useRouter } from "next/router";
import { ProductsFragment } from "./../../graphql/generated";
import { useState, useEffect } from "react";

export const useDisplayProduct = (allProducts: ProductsFragment[]): ProductsFragment[] => {
  const router = useRouter();
  const { category, sort } = router.query;
  const [productList, setProductList] = useState<ProductsFragment[]>(allProducts);

  useEffect(() => {
    if (category) {
      setProductList(allProducts.filter((p: ProductsFragment) => p.categories[0].name === category))
    } else {
      setProductList(allProducts)
    }

    if (sort === "price desc") {
      setProductList(productList.sort((a: ProductsFragment, b: ProductsFragment) => b.price - a.price))
    } else if (sort === "price asc") {
      setProductList(productList.sort((a: ProductsFragment, b: ProductsFragment) => a.price - b.price))
    } else if (sort === "new") {
      setProductList(productList.sort((a: ProductsFragment, b: ProductsFragment) => {
        return new Date(a?.createdAt) < new Date(b?.createdAt) ? 1 : -1;
      }))
    } else {
      setProductList(allProducts)
    }
  }, [productList])
  return productList;
};
