import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/Auth/PrivateRoute';
import Register from '../components/Auth/Register';
import DashBoard from '../components/Dashboard';
import DashboardRoom from '../components/Dashboard/ManageRoom';
import ManageHotels from '../components/Dashboard/ManageHotels';
import Users from '../components/Dashboard/Users';
import NotFound from '../components/NotFound/NotFound';
import useAuth from '../hooks/useAuth';
import DashboardHomePage from '../pages/Dashboard/DashboardHomePage';
import Home from '../pages/Home';
import Hotels from '../pages/Hotels';
import Room from '../pages/Room';
import Rooms from '../pages/Rooms';
import ManageRoom from '../components/Dashboard/ManageRoom';
import Account from '../components/Dashboard/Account';
import Settings from '../components/Dashboard/Settings';
import MyBooking from '../components/Dashboard/MyBooking';
import AllBooking from '../components/Dashboard/AllBooking';


const Routers = () => {
  const {isLogin}=useAuth()


    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id/:hotelId" element={<Room />} />
        <Route path="/hoteles" element={<Hotels />} />
        <Route
          path="/auth/register"
          element={isLogin ? <Navigate replace to="/" /> : <Register />}
        />
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="users" element={<Users />} />
          <Route path="hotels" element={<ManageHotels />} />
          <Route path="rooms" element={<ManageRoom />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="my-bookings" element={<MyBooking />} />
          <Route path="all-bookings" element={<AllBooking />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
};

export default Routers;