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
app.use("/user/welcome", welcome);
// app.use("/api", appRoutes);
app.use("/user/users", users);
app.use("/user/signUp", signUp);
// app.use("/user/userById/:userId", userById);
app.get("/user/userById/:userId", async(req,res) => {
    const userId = req.params.userId;
    console.log(userId);
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.json({ Message: "Invalid User Id" });
    // }
    const userData = await User.findById(userId);
    console.log(userData);
    if (!userData) {
        return res.json({ "Error": `No User found with ${userId}` });
    }
    return res.json(userData);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});