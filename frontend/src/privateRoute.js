import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("Logged in or not",isAuthenticated)
  return isAuthenticated === true ? children : <Navigate to="/" />
};

export default PrivateRoute;