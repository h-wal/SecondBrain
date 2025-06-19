import express from "express";
const app = express();
import userRouter from "./routers/users.js";
import dotenv from "dotenv"
dotenv.config();

app.use(express.json());

app.use("/user", userRouter);

app.get("/brainapp", (req,res) => {
    res.send(
        "Your Dashboard"
        //send a dashbaord
    )
})

app.listen(3030, () => {
    console.log("Listening on port 3030")
})