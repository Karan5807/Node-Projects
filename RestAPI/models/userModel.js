import  Mongoose  from "mongoose";

// Define a User Schema

const userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = Mongoose.model("User", userSchema);
export default User;

