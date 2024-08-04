import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth.types";
import { axiosInstance, axiosInstanceWithToken } from "./axios.instance";
import { AxiosError } from "axios";
import { IBasicResponse } from "@/types/Response.types";

export const login = async (userInfo: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/auth/signin", userInfo);
    const isSuccess: boolean = response.status == 200;
    console.log(isSuccess);
    const result: AuthResponse = {
      status: response.status,
      msg: isSuccess ? "Success" : "failed",
      token: isSuccess ? response.data.token : "",
      id: isSuccess ? response.data.id : "",
      name: isSuccess ? response.data.name : "",
      email: isSuccess ? response.data.email : "",
      message: isSuccess ? response.data.message : response.data.message,
    }
    isSuccess && localStorage.removeItem("token");
    isSuccess && localStorage.setItem("token", response.data.token as string);
    return result;
  } catch (error: any) {
    const result: AuthResponse = {
      status: error.status,
      msg: "failed",
      token: undefined
    };

    if (error instanceof AxiosError) {
      result.msg = error.response?.data.msg;
      result.message = error.response?.data.message;
    }
    return result;
  }
};

export const signup = async (userInfo: SignupRequest) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response);
    const isSuccess: boolean = response.status == 200;
    const result: AuthResponse = {
      status: response.status,
      msg: isSuccess ? "Success" : "failed",
      token: isSuccess ? response.data.token : "",
      id: isSuccess ? response.data.id : "",
      name: isSuccess ? response.data.name : "",
      email: isSuccess ? response.data.email : "",
      message: isSuccess ? response.data.message : response.data.message,
    }

    isSuccess && localStorage.removeItem("token");
    isSuccess && localStorage.setItem("token", response.data.token as string);

    return result;
  } catch (error: any) {
    const result: AuthResponse = {
      status: error.status,
      msg: "failed",
      token: undefined
    };
    // console.log(error);
    if (error instanceof AxiosError) {
      result.msg = error.response?.data.msg;
      result.message = error.response?.data.message;
    }
    return result;
  }
};


export const resetPassword = async (password: string, password2: string) => {
  const result: IBasicResponse = {
    status: 200,
    msg: "",
  }
  try {
    const response = await axiosInstanceWithToken.put("/auth/reset", { password, password2 });
    result.msg = response.data.msg;
    return result;
  } catch (error) {
    if (error instanceof AxiosError) {
      result.status = error.status as number;
      result.msg = error.response?.data.msg;
    }
  }
  return result;
}
export const logout = () => {
  localStorage.removeItem("token");
}