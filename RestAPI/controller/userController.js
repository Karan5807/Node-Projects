import  Mongoose  from "mongoose";
import User from "../models/userModel.js";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import GenrateUserID from "../services/GenrateUserID.js";
import dotenv from "dotenv";
dotenv.config();

const Secret_Key = process.env.SECRET_KEY;


export const welcome = (req, res) => {
    res.json({ "Tutorial": "Build REST API with node.js with using Bycrpt and JWT Json Web Token" });
};

// Section for SignUp 
export const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.json({ Message: `${email} is already Taken` });
    }

    try {
        const newUserId = await GenrateUserID();
        const hashedPassword = await Bcrypt.hash(password, 10);
        const registerUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            userId: newUserId
        });
        await registerUser.save();
        res.status(200).json({Message:"User Created Succesfully"});

    }
    catch (error) {
        res.status(400).json({ "Message": error });
    }
};

//  Section for Login
export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }

        const isPasswordValid = await Bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({message:"Incorrect Password"});
        }

        const Token = JWT.sign({email:email}, Secret_Key, {expiresIn:"2h"});
        res.send({message:"Login Done", Token});

    } catch (error) {
        res.status(500).json({message: error.Message});
    }
}

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
    const userId = req.body._id;
    if (!Mongoose.Types.ObjectId.isValid(userId)) {
        return res.json({ Message: `Invalid User Id ${userId}` });
    }
    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return res.json({ "Error": `No User found with ${userId}` });
        }
        return res.json(userData);
    } catch (error) {
        return res.json({ "Message": error });
    }

}

// Section for Update Users by ID
export const updateUser = async (req, res) => {
    const userId = req.body._id;
    const { firstName, lastName } = req.body;
    if (!Mongoose.Types.ObjectId.isValid(userId)) {
        return res.json({ Message: `Invalid User Id ${userId}` });
    }
    try {
        const userData = await User.findByIdAndUpdate(userId);
        if (!userData) {
            return res.json({ "Error": `No User found with ${userId}` });
        }
        const updateData = await User.findById(userId);
        return res.json(updateData);
    } catch (error) {
        return res.json({ "Message": error });
    }

}

// Section for delet User
export const deletUser = async (req, res) => {
    const userId = req.body._id;
    if (!Mongoose.Types.ObjectId.isValid(userId)) {
        return res.json({ Message: `Invalid User Id ${userId}` });
    }
    try {
        const userData = await User.findByIdAndDelete(userId);
        if (!userData) {
            return res.json({ "Error": `No User found with ${userId}` });
        }
        return res.json({Message:`${userId} is deleted succesfully`});
    } catch (error) {
        return res.json({ "Message": error });
    }

}
