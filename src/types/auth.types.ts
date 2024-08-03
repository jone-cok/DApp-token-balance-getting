import { IBasicResponse } from "./Response.types";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse extends IBasicResponse {
  token: string | undefined;
  id?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  message?: string | undefined;
}