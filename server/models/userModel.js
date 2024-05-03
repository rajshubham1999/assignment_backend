const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function(value) {
                // Regular expression for email validation
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(value) {
                // Check if confirmPassword matches password
                return this.password === value;
            },
            message: 'Passwords must match'
        }
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    termsAndConditions: {
        type: Boolean,
        required: [true, 'Please accept the terms and conditions']
    },
    profilePicture: {
        type: String
    }
});

module.exports = mongoose.model("users", userSchema);