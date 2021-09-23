export type Product = {
  price: number;
  name: string;
  description: string;
  id: string;
  categories: ProductCategories[];
  image: ProductImage;
  state: ProductState;
  createdAt: string;
  shipping: string;
  productTechnique: { name: string };
  productDetail: { name: string };
};

export type ProductCategories = {
  name: string;
};

export type ProductImage = {
  url: string;
};

export type ProductState = {
  name: string;
  colorStatus: {
    hex: string;
  };
};
