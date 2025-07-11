import { Avatar, Button, message, PageHeader, Popover } from "antd";
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
    message.success("Logged out successfully");
    navigate("/");

    if (location.pathname === "/") {
      window.location.reload(false);
    }
  };

  const popoverContent = (
    <div
      style={{
        minWidth: 200,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        boxShadow: "none", // ✅ Remove shadow from content itself
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
      <Avatar
        src={photo}
        size={64}
        style={{
          border: "2px solid #e6f4ff",
          backgroundColor: "#f0f5ff",
          marginBottom: 12,
        }}
      />

      <div
        style={{
          fontWeight: 600,
          fontSize: 15,
          color: "#1f1f1f",
          marginBottom: 4,
        }}>
        {name}
      </div>

      <div
        style={{
          fontSize: 12.5,
          color: "#8c8c8c",
          marginBottom: 12,
        }}>
        Personal Account
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
        <Link to='/dashboard/account' style={{ width: "100%" }}>
          <Button
            block
            style={{
              height: 36,
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              border: "1px solid #d9d9d9",
            }}>
            View Profile
          </Button>
        </Link>

        <Link to='/dashboard/settings' style={{ width: "100%" }}>
          <Button
            block
            style={{
              height: 36,
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              border: "1px solid #d9d9d9",
            }}>
            Settings
          </Button>
        </Link>

        <Button
          type='text'
          danger
          block
          onClick={logOut}
          style={{
            height: 36,
            fontSize: 13,
            fontWeight: 500,
            borderRadius: 8,
          }}>
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <PageHeader
      style={{ background: "white", zIndex: 3 }}
      title={
        <span style={{ color: "white", padding: "0px !important" }}>
          <Link to='/'>
            <img src={logo} alt='Site Logo' className='logo-nav' />
          </Link>
        </span>
      }
      extra={[
        // <div className='items' key='dashboard'>
        //   <Link to='/about'>ABOUT</Link>
        // </div>,
        // <div className='items' key='dashboard'>
        //   <Link to='/services'>SERVICES</Link>
        // </div>,
        <div className='items' key='dashboard'>
          <Link to='/dashboard'>DASHBOARD</Link>
        </div>,
        isLogin ? (
          <Popover
            key='user'
            content={popoverContent}
            trigger='hover'
            placement='bottomRight'
            overlayStyle={{
              padding: 0,
              boxShadow: "none", // 🔥 removes outer shell shadow
            }}
            overlayInnerStyle={{
              padding: 0,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)", // ✅ subtle inner shadow only
            }}>
            <Avatar style={{ cursor: "pointer" }} size='large' src={photo} />
          </Popover>
        ) : (
          <>
            <Link key='login' to='/auth/register'>
              <button className='btn-primary-full'>Login</button>
            </Link>
            <Link key='register' to='/auth/register'>
              <button className='btn-primary'>Register</button>
            </Link>
          </>
        ),
      ]}
    />
  );
};

export default NavBar;
