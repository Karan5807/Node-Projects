import express from "express";
import Mongoose from "mongoose";
import Cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import appRoutes from "./routes/userRoute.js";


const port = process.env.PORT;
const mongooseConnectUrl = process.env.MONGO_DB_URL;

// Database Connection
Mongoose.connect(mongooseConnectUrl)
    .then(() => { console.log("Database is connected with Server"); })
    .catch((error) => { console.error("Database Connection Error", error); })


const App = express();
App.use(Cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
App.use(express.json({ limit: "60kb" }));
App.use(express.urlencoded({ extended: true, limit: "60kb" }));
App.use(CookieParser());

App.get("/", (req,res) => {
    res.send("Hello from server")
});

// Using for the Api Call form appRoutes Controllers

App.use("/api", appRoutes);
// App.use("/user/users", users);
// App.use("/user/signUp", signUp);
// App.use("/user/userById/:userId", userById);


App.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});