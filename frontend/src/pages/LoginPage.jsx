import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const response = await login(userData);
            localStorage.setItem('user', JSON.stringify(response));
            if (response.role === 'admin') {
                navigate('/admin');
            } else if (response.role === 'staff') {
                navigate('/staff');
            } else {
                navigate('/');
            }
        } catch (error) {
            setError('Failed to login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/')}>Continue as Guest</button>
        </div>
    );
};

export default LoginPage;
