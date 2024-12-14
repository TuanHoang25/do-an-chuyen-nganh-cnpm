import { Link } from "react-router-dom";

const CompanyIntro = () => {
  return (
    <div>
      <h1>Giới thiệu về công ty</h1>
      <p>Chúng tôi là một công ty nhân sự hang đầu trong lĩnh vực công nghệ</p>
      <Link to="/apply" className="btn btn-primary">
        Ứng tuyển ngay
      </Link>
    </div>
  );
};

export default CompanyIntro;
