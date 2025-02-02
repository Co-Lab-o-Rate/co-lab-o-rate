import { Outlet } from "react-router";
import UnauthorizedPage from "./UnauthorizedPage";
import { useSession } from "../context/SessionContextProvider";

const AuthProtectedRoute = () => {
  const { session } = useSession();
  if (!session) {
    return <UnauthorizedPage />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;
