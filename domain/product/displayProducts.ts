import { useRouter } from "next/router"
import { Product } from "."

export const displayProduct = (allProducts: Product[]): any[] => {
  const router = useRouter();
  const { category, sort } = router.query 
  
  let products = !!category
    ? allProducts.filter(
        (p: any) => p.categories[0].name === category
      )
    : allProducts

  products =
    sort === 'price desc'
      ? products.sort((a: any, b: any) => a.price + b.price)
      : products
  products =
    sort === 'price asc'
      ? products.sort((a: any, b: any) => a.price - b.price)
      : products
  products =
    sort === 'new'
      ? products.sort(
          (a: any, b: any) => {
            return (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1
          }
        )
      : products

  return products
}