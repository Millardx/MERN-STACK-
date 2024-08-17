import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const StaffPage = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <div>
            <h2>Staff Page</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StaffPage;
