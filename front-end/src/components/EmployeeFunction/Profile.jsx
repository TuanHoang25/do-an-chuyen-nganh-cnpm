import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
const Profile = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [employee, setEmployee] = useState(null); // Đổi tên state để phản ánh dữ liệu là một object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployee(response.data.employees);
        // Giả sử API trả về một object employee
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Nhân viên không tồn tại.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Thông tin nhân viên</h2>
      <div className="card mb-4">
        <img
          src={`http://localhost:3000/${employee.userId.image}`}
          alt={employee.userId.name}
          style={{ width: 500 }}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{employee.userId.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {employee.userId.email}
          </p>
          <p className="card-text">
            <strong>Số điện thoại:</strong> {employee.phone}
          </p>
          <p className="card-text">
            <strong>Ngày sinh:</strong>{" "}
            {format(new Date(employee.dob), "dd/MM/yyyy")}
          </p>
          <p className="card-text">
            <strong>Giới tính:</strong> {employee.gender}
          </p>
          <p className="card-text">
            <strong>Trạng thái hôn nhân:</strong> {employee.maritalStatus}
          </p>
          <p className="card-text">
            <strong>Chức vụ:</strong> {employee.designation}
          </p>
          <p className="card-text">
            <strong>Phòng ban:</strong> {employee.department.name}
          </p>
          <p className="card-text">
            <strong>Mức lương:</strong> {employee.salary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
