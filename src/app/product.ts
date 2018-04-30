export interface Product {
  title: string;
  type: string;
  description: string;
  price: number;
}
export interface ProductId extends Product{
  id: String;
}
