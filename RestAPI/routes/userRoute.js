import Express from "express";
import User from "../models/userModel.js";
const Router = Express.Router();
// Call each Module form appController to control the Routes or API
import {welcome, users, signUp, userById, login, updateUser, deletUser} from "../controller/userController.js";

Router.get("/", users);
Router.get("/userById/:userId", userById);
Router.post("/signUp", signUp);
Router.post("/login", login);
Router.put("/updateUser", updateUser);
Router.delete("/deletUser", deletUser);


export default Router;