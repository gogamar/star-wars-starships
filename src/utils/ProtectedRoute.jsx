import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../stories/Spinner";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user, checking } = useSelector((state) => state.auth);

  if (checking) {
    return <Spinner isLoading={checking}></Spinner>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
