import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.scss';  // Import CSS
import UserModal from './UserModal'; // Component for handling modal input

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        console.log("Attempting to fetch users...");
        try {
            const response = await axios.get('http://localhost:5000/api/users/all');  // Use the full URL
            console.log("Users fetched:", response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const handleAddOrUpdateUser = async (user) => {
        try {
            if (currentUser) {
                await axios.put(`http://localhost:5000/api/users/update/${currentUser._id}`, user);
            } else {
                await axios.post('http://localhost:5000/api/users/add', user);
            }
            fetchUsers();
            setModalOpen(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Failed to save user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;
        try {
            await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const openModal = (user = null) => {
        setCurrentUser(user);
        setModalOpen(true);
    };

    return (
        <div>
            <h2>User Management</h2>
            <button onClick={() => openModal()}>Add User</button>
            <table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>
                    <button onClick={() => openModal(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
            {modalOpen && <UserModal user={currentUser} onSave={handleAddOrUpdateUser} onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default UserManagement;
