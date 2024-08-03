import { AxiosError } from "axios";
import { axiosInstance, axiosInstanceWithToken } from "./axios.instance";
import { IUpdateProfileRequest } from "@/types/Request.types";
// import { IBasicResponse, IProductResponse } from "@/types/Response.types";

// const getUserProfile = async () => {
//   try {
//     const response = await axiosInstanceWithToken.get('/user/profile');
//     const result = response.data;
//     result.status = response.status;
//     result.msg = response.status == 200 ? "Success" : "Failed";

//     return result;
//   } catch (error: AxiosError | unknown) {
//     if (error instanceof AxiosError) {
//       const result: IProfileResponse = {
//         status: error.response?.data.code,
//         msg: error.response?.data.msg,
//       }
//       return result;
//     }
//   }
// };

// const updateUserProfile = async (userProfile: IUpdateProfileRequest) => {
//   const result: IBasicResponse = {
//     status: 200,
//     msg: "",
//   }
//   try {
//     const response = await axiosInstanceWithToken.put("/user/update", userProfile);
//     result.msg = response.data.msg;
//     return result;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       result.status = error.status as number;
//       result.msg = error.response?.data.msg;
//     }
//   }
//   return result;
// }

// const getPhraseList = async () => {
//   try {
//     const response = await axiosInstance.get('/item/phrases');
//     const result: IPhraseResponse = {
//       status: response.status,
//       msg: response.status == 200 ? "Success" : "Failed",
//       phrases: response.data.phrases
//     }
//     return result;
//   } catch (error: AxiosError | unknown) {
//     if (error instanceof AxiosError) {
//       const result: IPhraseResponse = {
//         status: error.response?.data.code,
//         msg: error.response?.data.msg,
//       }
//       return result;
//     }
//   }
// };


// const getWishListResult = async () => {
//   try {
//     const response = await axiosInstanceWithToken.get('/item/wishlist');
//     const result: IWishlistResponse = {
//       status: response.status,
//       msg: response.status == 200 ? "Success" : "Failed",
//       wishlist: response.data.wishlist
//     }
//     return result;
//   } catch (error: AxiosError | unknown) {
//     if (error instanceof AxiosError) {
//       const result: IWishlistResponse = {
//         status: error.response?.data.code,
//         msg: error.response?.data.msg,
//       }
//       return result;
//     }
//   }
// };

// const uploadAvatar = async (file: File) => {
//   const result: IBasicResponse = {
//     status: 200,
//     msg: "",
//   }
//   try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await axiosInstanceWithToken.post('/asset/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     result.msg = response.data.msg;
//   } catch (error: AxiosError | unknown) {
//     if (error instanceof AxiosError) {
//       result.status = error.response?.status as number;
//       result.msg = error.response?.data.msg;
//     }
//   }
//   return result;
// };

// const getPublicProfile = async (email: string) => {
//   try {
//     const response = await axiosInstance.get('/user/profile/email/' + email);
//     const result: IProfileResponse = {
//       status: response.status,
//       msg: response.status == 200 ? "Success" : "Failed",
//       bio: response.data.bio,
//       avatar: response.data.avatar,
//       wishlist: response.data.wishlist,
//       shelter: response.data.shelter
//     }
//     return result;
//   } catch (error: AxiosError | unknown) {
//     if (error instanceof AxiosError) {
//       const result: IProfileResponse = {
//         status: error.response?.data.code,
//         msg: error.response?.data.msg,
//       }
//       return result;
//     }
//   }
// };

// const getUserWishList = async (email: string) => {
//   try {
//     const response = await axiosInstance.get('/user/wishlist/' + email);
//     const result: IWishlistResponse = {
//       status: response.status,
//       msg: response.status == 200 ? "Success" : "Failed",
//       wishlist: response.data.wishList,
//       shelter: response.data.shelter
//     }
//     return result;
//   } catch (error: AxiosError | unknown) {
//     if (error instanceof AxiosError) {
//       const result: IWishlistResponse = {
//         status: error.response?.data.code,
//         msg: error.response?.data.msg,
//       }
//       return result;
//     }
//   }
// };

// const addUser = async (productInfo:ProductRequest) => {
//   return await axios.post(`${usersUrl}/add`, user);
// }
const _ = {
  // getUserProfile,
  // updateUserProfile,
  // getPhraseList,
  // getWishListResult,
  // uploadAvatar,
  // getPublicProfile,
  // getUserWishList
};

export default _;