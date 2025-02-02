import { Outlet } from "react-router";
import { SessionContextProvider } from "../context/SessionContextProvider";

const Provider = () => {
  return (
    <SessionContextProvider>
      <Outlet />
    </SessionContextProvider>
  );
};

export default Provider;
