import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "../assets/VNU_IS_logo.png";

const Navbar: React.FC = () => {
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      // Chuyển hướng đến trang logout (hoặc thực hiện hành động logout khác)
      window.location.href = "/"; // Hoặc sử dụng React Router để chuyển hướng
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={Logo} alt="Company Logo" style={styles.logo} />
        <span style={styles.companyName}>IS-VNU</span>
      </div>
      <div style={styles.tabs}>
        <Link to="/attendance" style={styles.link}>
          Attendance
        </Link>
        <Link to="/add-fingerprint" style={styles.link}>
          Add Fingerprint
        </Link>
      </div>
      <div style={styles.logoutContainer}>
        <div onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.logoutIcon} />
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "linear-gradient(to right, #1E3A8A, #2563EB)", // Gradient from dark blue to light blue
    color: "white",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    boxSizing: "border-box",
  } as React.CSSProperties,
  logoContainer: {
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  } as React.CSSProperties,
  companyName: {
    fontSize: "20px",
    fontWeight: "bold",
  } as React.CSSProperties,
  tabs: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  } as React.CSSProperties,
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  logoutContainer: {
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  logoutButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,
  logoutIcon: {
    fontSize: "24px",
    color: "white",
  } as React.CSSProperties,
};

export default Navbar;
