import  Mongoose  from "mongoose";
import User from "../models/userModel.js";
import Bcrypt from "bcrypt";


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
        const hashedPassword = await Bcrypt.hash(password, 10);
        const registerUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });
        await registerUser.save();
        res.status(200).json( registerUser );
    }
    catch (error) {
        res.status(400).json({ "Message": error });
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
    const email = req.params.email;
    console.log(email);
    if (!Mongoose.Types.ObjectId.isValid(email)) {
        return res.json({ Message: "Invalid Email Id" });
    }
    const userData = await User.findById(email);
    console.log(userData);
    if (!userData) {
        return res.json({ "Error": `No User found with ${email}` });
    }
    return res.json(userData);
    //  catch (error) {
    //     return res.json({ "Message": error });
    // }
}
