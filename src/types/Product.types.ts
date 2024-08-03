import { IBasicResponse } from "./Response.types";

export interface ProductAddRequest {
  productId: number;
  name: string;
  description: string;
  price: number;
  cid: string;
  allowed: string;
}
export interface ProductUpdateRequest {
  productId: number;
  name: string;
  description: string;
  price: number;
  cid: string;
  allowed: string;
}
// export interface ProductGetRequest {
//   productId: number;
// }
// export interface ProductDeleteRequest {
//   productId: number;
// }

export interface IProduct {
  productId?: number;
  name?: string;
  description?: string;
  price?: number;
  imageaddress?: string;
  allowed?: string;
}

export interface ProductResponse extends IBasicResponse {
  message?: string;
  productData?: IProduct;
}