import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import Home from '../pages/Home';
import Room from '../pages/Room';
import Rooms from '../pages/Rooms';


const Routers = () => {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room" element={<Room />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    );
};

export default Routers;