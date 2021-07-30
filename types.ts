export interface ICategory {
  id: number
  name: string
  order: number
}

export interface IProduct {
  price: number
  name: string
  description: string
  id: string
  categories: Category[]
  image: Image
  state: State
  createdAt: string
}

export interface Category {
  name: string
}

export interface Image {
  url: string
}

export interface State {
  name: string
}
