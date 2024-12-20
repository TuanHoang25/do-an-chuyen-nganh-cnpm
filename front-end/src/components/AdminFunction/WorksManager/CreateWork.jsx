import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateWork = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [department, setDepartment] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchDepartments(); // Lấy danh sách nhân viên khi component được mount
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(response.data.departments);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy danh sách phòng ban:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data.employees); // Giả sử API trả về danh sách nhân viên
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy danh sách nhân viên:", error);
    }
  };

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);
    formData.append("assignedTo", assignedTo);
    formData.append("department", department);
    Array.from(attachments).forEach((file) =>
      formData.append("attachments", file)
    );

    try {
      const response = await axios.post(
        "http://localhost:3000/api/task/tasks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${localStorage.getItem("token")}`,
          },
        }
      );
      // Redirect to task list after successful creation
      if (response.data.success) {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên công việc"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Thời hạn"
            type="date"
            fullWidth
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <input type="file" multiple onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Nhân viên</InputLabel>
            <Select
              multiple
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              label="Nhân viên"
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.employeeId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Phòng ban</InputLabel>
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              label="Phòng ban"
            >
              {departments.map((dep) => (
                <MenuItem key={dep._id} value={dep._id}>
                  {dep.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Tạo công việc
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateWork;
