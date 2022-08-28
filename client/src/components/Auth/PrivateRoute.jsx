import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Register from './Register';

const PrivateRoute = ({children}) => {
    const { isLogin } = useAuth();
    console.log('isLoginPrivateROute',isLogin);
    return (
        <div>
            {
                isLogin? children :<Register to="/auth/register" />
            }
             
        </div>

    );
};

export default PrivateRoute;