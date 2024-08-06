import { ProductAddRequest, ProductUpdateRequest, ProductResponse } from "@/types/Product.types";
import { axiosInstance, axiosInstanceWithToken } from '@/service/apis/axios.instance';
import { AxiosError } from "axios";
import { log } from "console";

export const addProduct = async (productinfo: ProductAddRequest) => {
    console.log(productinfo);
    try {
        const response = await axiosInstanceWithToken.post("/product/store", productinfo);
        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            productData: isSuccess ? response.data.data : "",
        }
        result.productData && console.log("registered product id:", result.productData.productId);
        return result;
    } catch (error: any) {
        const result: ProductResponse = {
            status: error.response.status,
            msg: "failed",
        };
        if (error instanceof AxiosError) {
            result.msg = error.response?.data.msg;
            result.message = error.response?.data.message;
        }
        console.log(error);
        return result;
    }

};

export const getProduct = async (productId: string) => {
    try {
        const response = await axiosInstanceWithToken.get(`/product/${productId}`);
        // const response = await axiosInstance.get(`/product/${productId}`);
        // console.log(`/product/${productId}`);
        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            productData: isSuccess ? response.data.productData : "",
            productAll: isSuccess? response.data.productAll: [],
        }
        // console.log("products length", response.data.productAll);
        return result;
    } catch (error: any) {
        const result: ProductResponse = {
            status: error.response?.status,
            msg: "failed",
        };
        if (error instanceof AxiosError) {
            result.msg = error.response?.data.msg;
            result.message = error.response?.data.message;
        }
        console.log(error);
        return result;
    }
};

export const updateProduct = async (productId: string, productinfo: ProductUpdateRequest) => {
    try {
        const response = await axiosInstanceWithToken.put(`/product/${productId}`, productinfo);
        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            productData: isSuccess ? response.data.productData : "",
        }
        result.productData && console.log("upadteded product id:", String(result.productData));
        return result;
    } catch (error: any) {
        const result: ProductResponse = {
            status: error.status,
            msg: "failed",
        };
        if (error instanceof AxiosError) {
            result.msg = error.response?.data.msg;
            result.message = error.response?.data.message;
        }
        return result;
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        // const response = await axiosInstanceWithToken.delete(`/product/${productId}`, productId);
        const response = await axiosInstanceWithToken.delete(`/product/${productId}`);
        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            message: isSuccess ? response.data.message : "Delete falied",
        }
        return result;
    } catch (error: any) {
        const result: ProductResponse = {
            status: error.status,
            msg: "failed",
        };
        if (error instanceof AxiosError) {
            result.msg = error.response?.data.msg;
            result.message = error.response?.data.message;
        }
        return result;
    }
};

const _ = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}
export default _;
