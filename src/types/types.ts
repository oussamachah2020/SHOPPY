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
  image: string;
  category: string;
  rating: {
    count: number;
    rate: number;
  };
}

export interface PurchaseType {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface fetchedProduct {
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
