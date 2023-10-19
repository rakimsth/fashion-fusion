import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getToken } from "../utils/session";

export const AdminRoute = ({ children, role }) => {
  return (
    <>{isLoggedIn() && isAdmin(role) ? children : <Navigate to={"/login"} />}</>
  );
};

export const PrivateRoute = ({ children }) => {
  return <>{isLoggedIn() ? <Navigate to={"/admin/dashboard"} /> : children}</>;
};

const isAdmin = (role) => {
  // CHECK JWT TOKEN (Private)
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { data } = jwt_decode(token);
  const isValid = data.roles.includes(role);
  return isValid;
};

const isLoggedIn = () => {
  // check for access token
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { exp } = jwt_decode(token);
  const now = new Date().valueOf();
  const isValid = new Date(now).getTime() > new Date(exp).getTime();
  return isValid;
};
