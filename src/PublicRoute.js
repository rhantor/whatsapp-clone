import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

export const PublicRoute = () => {
  const { currentUser } = useAuth();
  return !currentUser ? <Outlet /> : <Navigate to="signup" />;
};
