import express from "express";
const app = express();
import userRouter from "./routers/users.js";
import dotenv from "dotenv"
const cors = require("cors")

dotenv.config();

app.use(cors())

app.use(express.json());

app.use("/user", userRouter);

app.listen(3030, () => {
    console.log("Listening on port 3030")
})