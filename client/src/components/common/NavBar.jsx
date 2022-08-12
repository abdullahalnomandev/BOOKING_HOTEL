import { Button, PageHeader } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/site-logo.png";
import './NavBar.css';
const NavBar = () => {
  return (
    <PageHeader
      style={{ background: "white", zIndex: 3 }}
      title={
        <span style={{ color: "white", padding: "0px !important" }}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </span>
      }
      extra={[
        <div className="items">
          <Link to="#">HOME</Link>
          <Link to="#">CUSTOMER</Link>
          <Link to="#">ADMIN</Link>
        </div>,
        <Link to="/login">
          <button className="btn-primary-full">Login</button>,
        </Link>,
        <Link to="/login">
          <button className="btn-primary">Register</button>
        </Link>
      ]}
    />
  );
};

export default NavBar;
