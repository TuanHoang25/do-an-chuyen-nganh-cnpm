import { FaUserTie } from "react-icons/fa"; // Icon đại diện cho nhân viên
import { motion } from "framer-motion"; // Tạo hiệu ứng động
import "./WelcomeEmployee.css"; // Import file CSS
import { useAuth } from "../../context/AuthContext";
const WelcomeEmployee = () => {
  const { user } = useAuth();
  return (
    <div className="greeting-container">
      {/* Hiệu ứng động cho icon */}
      <motion.div
        className="icon-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <FaUserTie className="greeting-icon" />
      </motion.div>

      {/* Hiệu ứng động cho lời chào */}
      <motion.h1
        className="greeting-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Chào mừng, {user.name}!
      </motion.h1>
    </div>
  );
};

export default WelcomeEmployee;
