import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Protected_Route = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");
  const isAuthenticated = localStorage.getItem("isAuthenticated") || false;

  if (!isAuthenticated) {
    toast.error("You Must Be Logged In To Access");
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
    toast.error("You Are Not Allowed To Access");
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected_Route;
