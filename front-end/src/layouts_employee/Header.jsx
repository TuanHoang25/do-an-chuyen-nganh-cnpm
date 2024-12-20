import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import LogoWhite from "../assets/images/logos/HrText.svg?react";
import { useAuth } from "../context/AuthContext";
import "./Header.css"; // CSS tùy chỉnh

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const {user} = useAuth();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
          <LogoWhite/>
        </div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              Bắt đầu
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              Giới thiệu
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav className="dropdown-custom-toggle">
              Danh sách
            </DropdownToggle>
            <DropdownMenu end className="dropdown-custom-menu">
              <DropdownItem className="dropdown-custom-item">
                Lựa chọn 1
              </DropdownItem>
              <DropdownItem className="dropdown-custom-item">
                Lựa chọn 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="dropdown-custom-item">
                Đặt lại
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={`http://localhost:3000/${user.image}`}
              alt="profile"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover", // Đảm bảo ảnh được cắt vừa khung
                borderRadius: "50%", // Tạo hiệu ứng tròn
                border: "2px solid white", // Viền trắng xung quanh
              }}
            />
          </DropdownToggle>
          <DropdownMenu className="dropdown-profile-menu">
            <DropdownItem header>Thông tin</DropdownItem>
            <DropdownItem>Tài khoản của tôi</DropdownItem>
            <DropdownItem>Chỉnh sửa hồ sơ</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Số dư của tôi</DropdownItem>
            <DropdownItem>Hộp thư đến</DropdownItem>
            <DropdownItem onClick={logout}>Đăng xuất</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
