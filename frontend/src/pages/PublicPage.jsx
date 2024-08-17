import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Public Page</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default PublicPage;
