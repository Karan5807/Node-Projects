import Express from "express";
import {Welcome} from "../Controller/userController.js";


const Router = Express.Router();

Router.get("/", Welcome);

export default Router;