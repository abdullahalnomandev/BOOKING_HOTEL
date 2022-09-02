import React, { useState } from "react";
import classnames from "classnames";
// import "bootstrap/dist/css/bootstrap.min.css";
import DashBoardHeader from "./DashBoardHeader";
import "./sidebar.css";
import { Divider, message } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiHotelLine, RiHotelFill } from "react-icons/ri";
import { MdHotel, MdAccountBox } from "react-icons/md";
import { AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { DiGhostSmall } from "react-icons/di";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
const Sidebar = () => {
  const [open, setOpen] = useState(
    window.matchMedia("(min-width: 1024px)").matches || false
  );
  const location = useLocation();
  console.log(location.pathname);
  const [isActive, setIsActive] = useState(
    (location.pathname === "/dashboard" && 1) ||
      (location.pathname === "/dashboard/users" && 2) ||
      (location.pathname === "/dashboard/hotels" && 3) ||
      (location.pathname === "/dashboard/rooms" && 4) ||
      (location.pathname === "/dashboard/account" && 5) ||
      (location.pathname === "/dashboard/settings" && 6) ||
      (location.pathname === "/dashboard/my-bookings" && 7) ||
      (location.pathname === "/dashboard/all-bookings" && 8) ||
      null
  );
  const mobile = window.matchMedia("(max-width: 768px)").matches;

  const { photo, name, isAdmin, isLogin } = useAuth();

  const adminRoute = [
    { id: 0, title: "Home", path: "/", icon: <AiOutlineHome /> },
    { id: 1, title: "Dashboard", path: "", icon: <BsFillGrid1X2Fill /> },
    { id: 2, title: "Users", path: "users", icon: <FiUsers /> },
    { id: 3, title: "Hotels", path: "hotels", icon: <RiHotelLine /> },
    { id: 4, title: "Rooms", path: "rooms", icon: <MdHotel /> },
    { id: 5, title: "Account", path: "account", icon: <MdAccountBox /> },
    { id: 6, title: "Settings", path: "settings", icon: <AiOutlineSetting /> },
    { id: 7, title: "My Bookings", path: "my-bookings", icon: <RiHotelFill /> },
    { id: 8, title: "Bookings", path: "all-bookings", icon: <DiGhostSmall /> }
  ];

  const userRoute = adminRoute.filter(({ path }) => {
    return path !== "rooms" && path !== "hotels" && path !== "all-bookings";
  });

  const navigate = useNavigate();

  const logOut = () => {
    message.error("Log out successful..,");
    localStorage.clear();
      navigate("/");
      window.location.reload(false);

  };

  return (
    <div className="nav-b">
      <div className="navHeaderWrap">
        <DashBoardHeader ontoggleNav={() => setOpen(!open)} />
      </div>
      <div className="bodyWrap">
        <div className={classnames({ blur: mobile && open })} />
        <div
          className={classnames(
            "sidenav",
            { sidenavOpen: open },
            { sidenavClose: !open }
          )}
        >
          <div className="profile" style={{ textAlign: "center" }}>
            <img src={photo} alt="" />
            <h3>{name}</h3>
            <p>Role: {isAdmin ? "ADMIN" : "USER"}</p>
            <Divider />
          </div>
          <a
            href="javascript:void(0)"
            className="closebtn hidex"
            onClick={() => this.ontoggleNav("0px")}
          >
            &times;
          </a>
          {(isAdmin ? adminRoute : userRoute).map(
            ({ title, path, id, icon }) => (
              <Link
              key={id}
                className={isActive === id ? "active" : "none-active"}
                to={path}
                onClick={() => setIsActive(id)}
              >
                {icon} {title}
              </Link>
            )
          )}
          <Link to="/" onClick={() => logOut()} style={{ color: "red" }}>
            <BiLogOut /> Log Out
          </Link>
        </div>

        <div
          className={classnames(
            "main",
            { mainShrink: open },
            { mainExpand: !open },
            { noscroll: mobile && open }
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
