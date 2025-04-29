const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    profileImage: {
        type: String, // URL or path to the image
        required: true
    }
});
const Register = mongoose.model('Register ', registerSchema);

module.exports = Register;