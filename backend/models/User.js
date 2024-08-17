const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'staff'],
        default: 'staff',
    },
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

const User = mongoose.model('User', userSchema);

module.exports = User;
