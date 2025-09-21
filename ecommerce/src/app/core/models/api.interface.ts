export interface Response<T> {
  results: number
  metadata: Metadata
  data: T[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface Product {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}


export interface CartResponse{
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: ProductCart[]
  totalCartPrice: number
}

export interface ProductCart {
  count: number
  _id: string
  product: Product
  price: number
}


export type orders = orderinfo[]

export interface orderinfo {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface CartItem {
  count: number
  _id: string
  product: Product
  price: number
}

export interface wishlist {
  status: string
  count: number
  data: Product[]
}

// export interface Daum {
//   sold: number
//   images: string[]
//   subcategory: Subcategory[]
//   ratingsQuantity: number
//   _id: string
//   title: string
//   slug: string
//   description: string
//   quantity: number
//   price: number
//   priceAfterDiscount?: number
//   imageCover: string
//   category: Category
//   brand: Brand
//   ratingsAverage: number
//   createdAt: string
//   updatedAt: string
//   __v: number
//   id: string
// }


