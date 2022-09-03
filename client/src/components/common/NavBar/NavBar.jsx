import { Avatar, Dropdown, Menu, message, PageHeader } from "antd";

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/site-logo.png";
import useAuth from "../../../hooks/useAuth";
import "./NavBar.css";
const NavBar = () => {
  const { name, photo, isLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    message.error("Log out successful..,");

    if (location.pathname === "/") {
      window.location.reload(false);
    }
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link to="#" style={{ color: "#313a45", fontWeight: "bold" }}>
              {name}
            </Link>
          )
        },
        {
          key: "2",
          label: (
            <Link
              to="/dashboard/account"
              style={{ color: "green", fontWeight: "bold" }}
            >
              View Profile
            </Link>
          )
        },
        {
          key: "7",
          label: (
            <a 
              onClick={logOut}
              style={{ color: "#fe5d5d", fontWeight: "bold" }}
            >
              Log Out
            </a>
          )
        }
      ]}
    />
  );
  return (
    <PageHeader
      style={{ background: "white", zIndex: 3 }}
      title={
        <span style={{ color: "white", padding: "0px !important" }}>
          <Link to="/">
            <img src={logo} alt="" className="logo-nav" />
          </Link>
        </span>
      }
      extra={[
        <div className="items">
          <Link to="/dashboard">DASHBOARD</Link>
        </div>,
        <>
          {isLogin ? (
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <Avatar style={{ cursor: "pointer" }} size="large" src={photo} />
            </Dropdown>
          ) : (
            <>
              <Link to="/auth/register">
                <button className="btn-primary-full">Login</button>,
              </Link>
              ,
              <Link to="/auth/register">
                <button className="btn-primary">Register</button>
              </Link>
            </>
          )}
        </>
      ]}
    />
  );
};

export default NavBar;
