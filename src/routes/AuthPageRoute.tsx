import path from "@/constants/path";
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
}
export const checkJWT = () => {
  const token = localStorage.getItem('token');
  // console.log(token);
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    // console.log(exp && exp * 1000);
    if (exp && (Date.now() >= exp * 1000)) {
      return false; // Token has expired
    }
    return true; // Token is valid
  } catch (error) {
    return false; // Invalid token
  }
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const token = localStorage.getItem("token");

  if (token && checkJWT()) {
    // Redirect to login if the user is not authenticated
    return <Navigate to={path.PRODUCT} />
  }
  // Render the protected component
  return <Component />
};

export default ProtectedRoute;
