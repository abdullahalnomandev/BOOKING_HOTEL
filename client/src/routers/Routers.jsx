import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const Routers = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
};

export default Routers;