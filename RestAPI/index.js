import express from "express";
import Cors from "cors";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDB from "./services/DBconnection.js";
import appRoutes from "./routes/userRoute.js";
dotenv.config();


const port = process.env.PORT;
// Database Connection
ConnectDB();


const App = express();
App.use(Cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
App.use(express.json({ limit: "1024kb" }));
App.use(express.urlencoded({ extended: true, limit: "1024kb" }));
App.use(CookieParser());

App.get("/", (req,res) => {
    res.send("Hello from server")
});

// Using for the Api Call form appRoutes Controllers
App.use("/users", appRoutes);

App.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});