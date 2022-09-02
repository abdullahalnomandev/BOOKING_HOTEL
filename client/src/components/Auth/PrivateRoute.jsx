import React from "react";
import useAuth from "../../hooks/useAuth";
import Register from "./Register";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useAuth();
  return <div>{isLogin ? children : <Register to="/auth/register" />}</div>;
};

export default PrivateRoute;
