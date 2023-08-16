export interface signUpType {
  username: string;
  email: string;
  password: string;
}

export interface signInType {
  email: string;
  password: string;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  pieces: number;
  imageURL: string;
  category: string;
}

export interface PurchaseType {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface fetchedProduct {
  key: string;
  id: string;
  title: string;
  description: string;
  category: string;
  imageURL: string;
  pieces: string;
  price: string;
}

export interface adminProduct {
  title: string;
  description: string;
  category: string;
  imageURL: string;
  pieces: string;
  price: string;
}

export interface ordersType {
  orderId: string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  category: string;
  ordered_at: string;
  address: string;
  city: string;
  name: string;
  phone: string;
  seen: boolean;
  quantity: number;
  delivered: boolean;
}
