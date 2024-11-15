import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActivate, redirectPath = "/" }) => {
  if (!canActivate) {
    return (
      <Navigate
        to={redirectPath}
        replace
        state={{ from: window.location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
