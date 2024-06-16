import Express from "express";
import Mongoose from "mongoose";
import Cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import Router from "./Routes/Routes.js";
dotenv.config();

// Env Data
const Port = process.env.PORT;
const mongooseConnectUrl = process.env.MONGO_DB_URL;

const App = Express();
App.use(Express.json({ limit: "60kb" }));
App.use(Express.urlencoded({ extended: true, limit: "60kb" }));
App.use(CookieParser());

// Database Connection
Mongoose.connect(mongooseConnectUrl)
    .then(() => { console.log("Database is connected with Server"); })
    .catch((error) => { console.error("Database Connection Error", error); })


//
App.use("/", Router);


App.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
})