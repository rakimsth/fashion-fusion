import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getToken } from "../utils/session";
import moment from "moment";

export const AdminRoute = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && isAdmin(role) ? (
        children
      ) : isLoggedIn() && !isAdmin(role) ? (
        <Navigate replace to={"/admin/dashboard"} />
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </>
  );
};

export const PrivateRoute = ({ children }) => {
  return (
    <>
      {isLoggedIn() ? <Navigate replace to={"/admin/dashboard"} /> : children}
    </>
  );
};

const isAdmin = (role) => {
  if (!role) return true;
  const token = getToken();
  if (!token) return false;
  const { data } = jwt_decode(token);
  const isValid = data?.roles.includes(role) || false;
  return isValid;
};

const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  const { exp } = jwt_decode(token); //timestamp seconds
  const now = new Date().valueOf(); //timestamp in millisecs
  const isValid = moment.unix(exp) > moment(now);
  return isValid;
};
