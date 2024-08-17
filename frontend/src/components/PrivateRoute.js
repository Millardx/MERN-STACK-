// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || (roles && !roles.includes(user.role))) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
