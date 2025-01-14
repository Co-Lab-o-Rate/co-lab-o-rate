import { Outlet } from "react-router";
import NotFoundPage from "./NotFoundPage";
import { useSession } from "../context/AuthProvider";

const AuthProtectedRoute = () => {
  const { session } = useSession();
  if (!session) {
    // or you can redirect to a different page and show a message
    return <NotFoundPage />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;
