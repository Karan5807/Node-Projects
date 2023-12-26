const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const appRoutes = require("./routes/route.js");
const { welcome, signUp, userById, users } = require("./controller/userController.js");

const port = process.env.PORT;
const mongooseConnectUrl = process.env.MONGO_DB_URL;

// Database Connection
mongoose.connect(mongooseConnectUrl)
    .then(() => { console.log("Database is connected with Server"); })
    .catch((error) => { console.error("Database Connection Error", error); })




const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// Using for the Api Call form appRoutes Controllers
// app.use("/",welcome);
app.use("/api", appRoutes);
app.use("/user/users", users);
app.use("/user/signUp", signUp);
app.use("/user/userById", userById);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});