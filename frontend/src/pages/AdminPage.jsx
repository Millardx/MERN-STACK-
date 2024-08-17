import React from 'react';
import UserManagement from '../components/UserManagement';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to login page after logout
    };
    
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <UserManagement />
        </div>
    );
};

export default AdminPage;
