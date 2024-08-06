import path from "@/constants/path";

import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Admin from "@/pages/Admin/index";
import Product from "@/pages/Product/index";

import TokenShow from "@/pages/TokenShow";
import User from "@/pages/User";

import AuthPageRoute from './AuthPageRoute';
import ProtectedRoute from "./ProtectedRoute";

const HomeRoutes = [
  {
    path: path.HOME,
    element: <Home />,
  },
  {
    path: path.LOGIN,
    element: <AuthPageRoute element={Login} />,
  },
  {
    path: path.SIGNUP,
    element: <AuthPageRoute element={SignUp} />,
  },
 
  {
    path: path.USER,
    element: <ProtectedRoute element={User} />,
  },
  {
    path: path.ADMIN,
    element: <ProtectedRoute element={Admin} />,
  },
  {
    path: path.PRODUCT,
    element: <ProtectedRoute element={Product} />,
  },
  {
    path: path.TOKENSHOW,
    element: <TokenShow />,
  },
];


export default HomeRoutes;
