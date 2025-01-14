import { FC } from "react";
import { Navigate, Outlet } from "react-router";

interface ComponentProps {
  isAuthenticated: boolean;
}

const PrivateRoutes: FC<ComponentProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
