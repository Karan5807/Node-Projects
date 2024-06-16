import Express from "express";
import User from "../models/userModel.js";
const Router = Express.Router();
// Call each Module form appController to control the Routes or API
import {welcome, users, signUp, userById} from "../controller/userController.js";

Router.get("/", welcome);
Router.post("/signUp", signUp);
Router.get("/users", users);
Router.get("/userById/:userId", userById);

export default Router;