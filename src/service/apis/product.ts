import { ProductAddRequest, ProductUpdateRequest, ProductResponse } from "@/types/Product.types";
import { axiosInstance, axiosInstanceWithToken } from '@/service/apis/axios.instance';
import { AxiosError } from "axios";
import { log } from "console";

export const AddProductData = async (productinfo: ProductAddRequest) => {
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

export const getProduct = async (productid: number) => {
    try {
        // const response = await axiosInstanceWithToken.get(`/product/${productId}`, productId);
        const response = await axiosInstanceWithToken.get(`/product/${productid}`);
        console.log(`/product/:${productid}`);
        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            productData: isSuccess ? response.data.data : "",
        }
        result.productData && console.log("getted product id:", result.productData.productId);
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


export const updateProduct = async (productid: number, productinfo: ProductUpdateRequest) => {
    try {
        const response = await axiosInstanceWithToken.put(`/product/${productid}`, productinfo);
        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            productData: isSuccess ? response.data.data : "",
        }
        result.productData && console.log("upadteded product id:", result.productData.productId);
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

export const deleteProduct = async (productid: number) => {
    try {
        // const response = await axiosInstanceWithToken.delete(`/product/${productId}`, productId);
        const response = await axiosInstanceWithToken.delete(`/product/${productid}`);

        const isSuccess: boolean = response.status == 200;
        const result: ProductResponse = {
            status: response.status,
            msg: isSuccess ? "Success" : "failed",
            message: isSuccess ? "Delete success" : "Delete falied",
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
    AddProductData,
    getProduct,
    updateProduct,
    deleteProduct,
}
export default _;

// export const getUsers = async (id) => {
//     id = id || '';
//     return await axios.get(`${usersUrl}/${id}`);
// }

// export const addUser = async (user) => {
//     return await axios.post(`${usersUrl}/add`, user);
// }

// export const deleteUser = async (id) => {
//     return await axios.delete(`${usersUrl}/${id}`);
// }

// export const editUser = async (id, user) => {
//     return await axios.put(`${usersUrl}/${id}`, user)
// }