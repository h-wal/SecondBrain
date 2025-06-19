"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const users_js_1 = __importDefault(require("./routers/users.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/user", users_js_1.default);
app.get("/brainapp", (req, res) => {
    res.send("Your Dashboard"
    //send a dashbaord
    );
});
app.listen(3030, () => {
    console.log("Listening on port 3030");
});
