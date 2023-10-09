import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  return <>{isAdmin() ? children : <Navigate to={"/login"} />}</>;
};

const isAdmin = () => {
  // CHECK JWT TOKEN (Private)
  // Role check (Protected)
  return true;
};
