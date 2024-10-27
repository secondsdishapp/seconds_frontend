import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext/AuthContext.jsx";

export default function ProtectedRoutes() {
  const { currentUser } = useContext(AuthContext);

  return (
    currentUser ? 
      <Outlet /> : 
      <Navigate to="/auth" />
  )
}
