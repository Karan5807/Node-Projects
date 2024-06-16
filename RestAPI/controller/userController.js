import  Mongoose  from "mongoose";
import User from "../models/userModel.js";
import Bcrypt from "bcrypt";


export const welcome = (req, res) => {
    res.json({ "Tutorial": "Build REST API with node.js with using Bycrpt and JWT Json Web Token" });
};

// Section for SignUp 
export const signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ userName });

    if (existingUser) {
        res.json({ Message: `${userName} is already Taken` });
    }

    try {
        const hashedPassword = await Bcrypt.hash(password, 10);
        const registerUser = new User({
            userName: userName,
            email: email,
            password: hashedPassword
        });
        await registerUser.save();
        res.json( registerUser );
    }
    catch (error) {
        res.json({ "Message": error });
    }
};

// Section for get all users Details
export const users = async (req, res) => {
    try {
        const usersData = await User.find();
        if (usersData.length <= 0) {
            return res.json({ "Message": "No Data in User List" });
        }
        return res.json({ usersData });
    } catch (error) {
        res.json({ "Message": error });
    }
};

// Section for get Users by ID
export const userById = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    if (!Mongoose.Types.ObjectId.isValid(userId)) {
        return res.json({ Message: "Invalid User Id" });
    }
    const userData = await User.findById(userId);
    console.log(userData);
    if (!userData) {
        return res.json({ "Error": `No User found with ${userId}` });
    }
    return res.json(userData);
    //  catch (error) {
    //     return res.json({ "Message": error });
    // }
}
