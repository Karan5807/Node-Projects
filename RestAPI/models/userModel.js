import  Mongoose  from "mongoose";

// Define a User Schema

const userSchema = new Mongoose.Schema({
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

const User = Mongoose.model("User", userSchema);
export default User;

