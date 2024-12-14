import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    title: "Home",
    href: "/admin-dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Attendance",
    href: "/admin-dashboard/attendanceManager",
    icon: "bi bi-bell",
  },
  {
    title: "Departments", // Thay đổi tiêu đề thành "Departments"
    href: "/admin-dashboard/departments", // Cập nhật href
    icon: "bi bi-building", // Thay đổi icon thành icon phù hợp với departments
  },
  {
    title: "Employees",
    href: "/admin-dashboard/employees",
    icon: "bi bi-people",
  },
  {
    title: "Applicants",
    href: "/admin-dashboard/applicants",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const { user } = useAuth();
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">
          {user && user.name}
        </div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Link to="/login" className="mt-3">
            {/* Replace Button with Link */}
            <Button color="primary" block>
              {/* Use a primary button */}
              <i className="bi bi-box-arrow-in-right"></i> Đăng xuất
            </Button>
          </Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
