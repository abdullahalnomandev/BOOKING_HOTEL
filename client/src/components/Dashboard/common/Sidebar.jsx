import { Divider, message } from "antd";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { DiGhostSmall } from "react-icons/di";
import { FiUsers } from "react-icons/fi";
import { MdAccountBox, MdHotel } from "react-icons/md";
import { RiHotelFill, RiHotelLine } from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import DashBoardHeader from "./DashBoardHeader";
import "./sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(
    window.matchMedia("(min-width: 1024px)").matches || false
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { photo, name, isAdmin } = useAuth();
  const mobile = window.matchMedia("(max-width: 768px)").matches;

  const adminRoute = [
    { id: 0, title: "Home", path: "/", icon: <AiOutlineHome /> },
    {
      id: 1,
      title: "Dashboard",
      path: "/dashboard",
      icon: <BsFillGrid1X2Fill />,
    },
    { id: 2, title: "Users", path: "/dashboard/users", icon: <FiUsers /> },
    {
      id: 3,
      title: "Hotels",
      path: "/dashboard/hotels",
      icon: <RiHotelLine />,
    },
    { id: 4, title: "Rooms", path: "/dashboard/rooms", icon: <MdHotel /> },
    {
      id: 5,
      title: "Account",
      path: "/dashboard/account",
      icon: <MdAccountBox />,
    },
    {
      id: 6,
      title: "Bookings",
      path: "/dashboard/all-bookings",
      icon: <DiGhostSmall />,
    },
    {
      id: 7,
      title: "My Bookings",
      path: "/dashboard/my-bookings",
      icon: <RiHotelFill />,
    },
    {
      id: 8,
      title: "Settings",
      path: "/dashboard/settings",
      icon: <AiOutlineSetting />,
    },
  ];

  const userRoute = adminRoute.filter(({ path }) => {
    return (
      path !== "/dashboard/rooms" &&
      path !== "/dashboard/hotels" &&
      path !== "/dashboard/all-bookings" &&
      path !== "/dashboard/users"
    );
  });

  const routes = isAdmin ? adminRoute : userRoute;
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    const activeRoute = routes.findIndex(
      (route) => location.pathname === route.path
    );
    setIsActive(activeRoute === -1 ? null : routes[activeRoute].id);
  }, [location.pathname, routes]);

  const logOut = () => {
    message.success("Log out successful.");
    localStorage.clear();
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div className='nav-b'>
      <div className='navHeaderWrap'>
        <DashBoardHeader ontoggleNav={() => setOpen(!open)} />
      </div>
      <div className='bodyWrap'>
        <div className={classnames({ blur: mobile && open })} />
        <div
          className={classnames(
            "sidenav",
            { sidenavOpen: open },
            { sidenavClose: !open }
          )}>
          <div className='profile' style={{ textAlign: "center" }}>
            <img src={photo} alt='' />
            <h3>{name}</h3>
            <p>Role: {isAdmin ? "ADMIN" : "USER"}</p>
            <Divider style={{ margin: "5px 0" }} />
          </div>

          <button
            type='button'
            className='closebtn hidex'
            onClick={() => setOpen(false)}
            aria-label='Close sidebar'>
            &times;
          </button>

          <div className='nav-links-wrapper'>
            <div className='nav-links'>
              {(isAdmin ? adminRoute : userRoute).map(
                ({ title, path, id, icon }) => (
                  <Link
                    key={id}
                    className={isActive === id ? "active" : "none-active"}
                    to={path}
                    onClick={() => setIsActive(id)}>
                    {icon} {title}
                  </Link>
                )
              )}
            </div>

            <div className='logout-link'>
              <Link to='/' onClick={logOut} style={{ color: "red" }}>
                <BiLogOut /> Log Out
              </Link>
            </div>
          </div>
        </div>

        <div
          className={classnames(
            "main",
            { mainShrink: open },
            { mainExpand: !open },
            { noscroll: mobile && open }
          )}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
