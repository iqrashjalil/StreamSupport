import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Protected_Route = ({ children, roleRequired }) => {
  const { isAuthenticated, user } = useSelector((state) => state.users);

  if (!isAuthenticated) {
    toast.error("You Must Be Logged In To Access");
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    toast.error("You Are Not Allowed To Access");
    return <Navigate to="/" />;
  }

  // If authenticated and has the correct role, render the route
  return children;
};

export default Protected_Route;
