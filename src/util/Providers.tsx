import { Outlet } from "react-router";
import { SessionProvider } from "../context/AuthProvider";

const Providers = () => {
  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
};

export default Providers;