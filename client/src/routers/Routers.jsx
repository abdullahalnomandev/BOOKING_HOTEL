import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AboutPage from "../pages/About";
import ServicesPage from "../pages/Services";
const Register = React.lazy(() => import("../components/Auth/Register"));
const DashBoard = React.lazy(() => import("../components/Dashboard"));
const ManageHotels = React.lazy(() =>
  import("../components/Dashboard/ManageHotels")
);
const Users = React.lazy(() => import("../components/Dashboard/Users"));
const NotFound = React.lazy(() => import("../components/NotFound/NotFound"));
const DashboardHomePage = React.lazy(() =>
  import("../pages/Dashboard/DashboardHomePage")
);
const Home = React.lazy(() => import("../pages/Home"));
const Hotels = React.lazy(() => import("../pages/Hotels"));
const Room = React.lazy(() => import("../pages/Room"));
const Rooms = React.lazy(() => import("../pages/Rooms"));
const ManageRoom = React.lazy(() =>
  import("../components/Dashboard/ManageRoom")
);
const Account = React.lazy(() => import("../components/Dashboard/Account"));
const Settings = React.lazy(() => import("../components/Dashboard/Settings"));
const PrivateRoute = React.lazy(() =>
  import("../components/Auth/PrivateRoute")
);
const MyBooking = React.lazy(() => import("../components/Dashboard/MyBooking"));
const AllBooking = React.lazy(() =>
  import("../components/Dashboard/AllBooking")
);

const Routers = () => {
  const { isLogin, isAdmin } = useAuth();

  console.log({ isAdmin });

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#fff",
            fontFamily: "Segoe UI, sans-serif",
          }}>
          <div
            style={{ fontSize: "20px", marginBottom: "1rem", color: "#333" }}>
            Finding your perfect stay<span className='dots'>...</span>
          </div>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px dashed #ccc",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
          </style>
        </div>
      }>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/room/:id/:hotelId' element={<Room />} />
        <Route path='/hoteles' element={<Hotels />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route
          path='/auth/register'
          element={isLogin ? <Navigate replace to='/' /> : <Register />}
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }>
          <Route index element={<DashboardHomePage />} />
          <Route path='users' element={<Users />} />
          <Route path='account' element={<Account />} />
          <Route path='settings' element={<Settings />} />
          <Route path='my-bookings' element={<MyBooking />} />

          <Route path='all-bookings' element={<AllBooking />} />
          <Route path='rooms' element={<ManageRoom />} />
          <Route path='hotels' element={<ManageHotels />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
