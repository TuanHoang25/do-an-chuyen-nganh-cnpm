import { useState } from "react";
import axios from "axios";

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
    aspiration: "",
    languageCertificate: "",
    skillCertificate: "",
    languageProof: null,
    skillProof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "skillProof" || name === "cv" || name === "languageProof") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ApplicantDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      ApplicantDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/application/apply",
        ApplicantDataObj
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form Ứng Tuyển</h2>
      <input
        type="text"
        name="name"
        placeholder="Tên"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Số điện thoại"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="aspiration"
        placeholder="Kì vọng ứng tuyển"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="languageCertificate"
        placeholder="Chứng chỉ ngoại ngữ"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="skillCertificate"
        placeholder="Chứng chỉ kỹ năng"
        onChange={handleChange}
        required
      />
      <input type="file" name="cv" onChange={handleChange} required />
      <input
        type="file"
        name="languageProof"
        onChange={handleChange}
        required
      />
      <input type="file" name="skillProof" onChange={handleChange} required />
      <button type="submit">Gửi thông tin</button>
    </form>
  );
};

export default Apply;
