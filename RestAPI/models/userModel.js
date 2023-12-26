const mongoose = require("mongoose");
const { v4 : uuidv4 }= require("uuid");

// Define a User Schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    userId:{
        type: String,
        required: true,
        unique: true,
        default: uuidv4()
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };

