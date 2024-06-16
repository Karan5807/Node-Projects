import Mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongooseConnectUrl = process.env.MONGO_DB_URL;




const ConnectDB = async () =>{
    try {
    await Mongoose.connect(mongooseConnectUrl)
    .then(() => { console.log("Database is connected with Server"); });
    } catch (error) {
        console.error("Database having connection Error", error);
    }
}

export default ConnectDB

