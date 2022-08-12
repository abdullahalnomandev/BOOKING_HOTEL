import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login';
import NotFound from '../components/NotFound/NotFound';
import Home from '../pages/Home';
import Hotels from '../pages/Hotels';
import Room from '../pages/Room';
import Rooms from '../pages/Rooms';


const Routers = () => {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/hoteles" element={<Hotels />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
};

export default Routers;