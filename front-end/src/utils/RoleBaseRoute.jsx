import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />;
  }
  return user ? children : <Navigate to="/login" />;
};

RoleBaseRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.array.isRequired,
};
export default RoleBaseRoute;
