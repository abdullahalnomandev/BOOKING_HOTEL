import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Header from '../Home/Header';

const Login = () => {
    return (
      <div style={{ padding: "0 5%" }}>
        <NavBar />
        <div style={{ color: "red", textAlign: "center" }}>
          <h1>LOGIN Page Coming</h1>
          <Link to="/">
            <button className="btn-primary-full"> Back Home</button>
          </Link>
        </div>
      </div>
    );
};

export default Login;