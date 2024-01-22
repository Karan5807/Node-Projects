import express from "express";

const app = express();

app.listen(1234, ()=>{
    console.log("server is running at 1234");
})