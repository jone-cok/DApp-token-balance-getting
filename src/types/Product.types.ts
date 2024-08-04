import { IBasicResponse } from "./Response.types";

export interface ProductAddRequest {
  productId: string;
  name: string;
  description: string;
  price: string;
  cid: string;
  allowed: string;
}
export interface ProductUpdateRequest {
  productId: string;
  name: string;
  description: string;
  price: string;
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
  productId?: string;
  name?: string;
  description?: string;
  price?: string;
  cid?: string;
  allowed?: string;
}

export interface ProductResponse extends IBasicResponse {
  message?: string;
  productData?: IProduct;
}
